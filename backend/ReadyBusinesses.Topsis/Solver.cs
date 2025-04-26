using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Topsis;

public class Solver : ISolver
{
    public List<Post> GetSortedPosts(List<Post> businesses)
    {
        var criteriaMatrix = businesses
            .SelectMany(b => b.Recommendations)
            .Select(r => r.Recommendation)
            .Where(r => r.GivenById == null)
            .Select(r => r.CriteriaEstimates.ToList())
            .ToList();
        
        var normalized = NormalizeCriteriaMatrix(criteriaMatrix);
        var weightedNormalized = CalculateWeightedNormalizedCriteriaMatrix(normalized);
        var (pis, nis) = CalculatePisAndNis(weightedNormalized);

        var distancesToPis = CalculateDistancesToPis(weightedNormalized, pis);
        var distancesToNis = CalculateDistancesToPis(weightedNormalized, nis);

        var closenessToPis = CalculateClosenessToPis(distancesToPis, distancesToNis);
        
        var closenessIndex = closenessToPis
            .Select((closeness, index) => new { Closeness = closeness, Index = index })
            .OrderByDescending(x => x.Closeness)
            .ToList();
        
        var sortedPosts = closenessIndex
            .Select(ci => businesses.ElementAt(ci.Index))
            .ToList();

        return sortedPosts;
    }
    
    public List<List<CriteriaEstimate>> NormalizeCriteriaMatrix(List<List<CriteriaEstimate>> criteriaMatrix)
    {
        var currentEstimates = new List<List<CriteriaEstimate>>();
        
        var maximumValues = criteriaMatrix.Select(x => x.Max(y => y.Estimate)).ToList();
        var minimumValues = criteriaMatrix.Select(x => x.Min(y => y.Estimate)).ToList();

        for (var index = 0; index < criteriaMatrix.Count; index++)
        {
            var criteriaEstimates = criteriaMatrix[index];
            var currentEstimatesList = new List<CriteriaEstimate>();
            
            for (var j = 0; j < criteriaEstimates.Count; j++)
            {
                var criteriaEstimate = criteriaEstimates.ElementAt(j);
                
                var isMaximized = criteriaEstimate.Criteria.IsMaximized;
                var xjPlus = isMaximized 
                    ? maximumValues[index] 
                    : minimumValues[index];
                
                var xjMinus = isMaximized 
                    ? minimumValues[index] 
                    : maximumValues[index];
                
                var currentCriteria = criteriaMatrix[index][j];

                var currentEstimate = isMaximized
                    ? (currentCriteria.Estimate - xjMinus) / (xjPlus - xjMinus)
                    : (xjMinus - currentCriteria.Estimate) / (xjMinus - xjPlus);
                
                currentEstimatesList.Add(new CriteriaEstimate
                {
                    Estimate = currentEstimate,
                    Criteria = criteriaEstimate.Criteria,
                    Recommendation = criteriaEstimate.Recommendation,
                    CriteriaId = criteriaEstimate.CriteriaId,
                    RecommendationId = criteriaEstimate.RecommendationId,
                });
            }
            
            currentEstimates.Add(currentEstimatesList);
        }
        
        return currentEstimates;
    }

    public List<List<CriteriaEstimate>> CalculateWeightedNormalizedCriteriaMatrix(List<List<CriteriaEstimate>> normalizedCriteriaMatrix)
    {
        var weightedCriteriaMatrix = new List<List<CriteriaEstimate>>();
        
        foreach (var criteriaMatrix in normalizedCriteriaMatrix)
        {
            var weightedNormalizedCriteriaMatrix = new List<CriteriaEstimate>();
            
            foreach (var criteriaEstimate in criteriaMatrix)
            {
                weightedNormalizedCriteriaMatrix.Add(new CriteriaEstimate
                {
                    Estimate = criteriaEstimate.Estimate * criteriaEstimate.Criteria.Weight, 
                    CriteriaId = criteriaEstimate.CriteriaId,
                    RecommendationId = criteriaEstimate.RecommendationId,
                    Recommendation = criteriaEstimate.Recommendation,
                    Criteria = criteriaEstimate.Criteria,
                });
            }
            
            weightedCriteriaMatrix.Add(weightedNormalizedCriteriaMatrix);
        }
        
        return weightedCriteriaMatrix;
    }

    public (List<CriteriaEstimate> Pis, List<CriteriaEstimate> Nis) CalculatePisAndNis(List<List<CriteriaEstimate>> weightedNormalizedCriteriaMatrix)
    {
        var pis = new List<CriteriaEstimate>();
        var nis = new List<CriteriaEstimate>();

        var criteriaCount = weightedNormalizedCriteriaMatrix[0].Count;

        for (var j = 0; j < criteriaCount; j++)
        {
            var column = weightedNormalizedCriteriaMatrix.Select(row => row[j]).ToList();
            
            bool isMaximized = column[0].Criteria.IsMaximized;

            var extremePis = isMaximized
                ? column.OrderByDescending(x => x.Estimate).First()
                : column.OrderBy(x => x.Estimate).First();

            var extremeNis = isMaximized
                ? column.OrderBy(x => x.Estimate).First()
                : column.OrderByDescending(x => x.Estimate).First();

            pis.Add(extremePis);
            nis.Add(extremeNis);
        }

        return (pis, nis);
    }

    public List<decimal> CalculateDistancesToPis(
        List<List<CriteriaEstimate>> weightedNormalizedCriteriaMatrix,
        List<CriteriaEstimate> pis)
    {
        var distances = new List<decimal>();

        foreach (var t in weightedNormalizedCriteriaMatrix)
        {
            decimal distanceInSquare = 0;

            for (int j = 0; j < t.Count; j++)
            {
                var estimate = (decimal)t[j].Estimate;
                var pisEstimate = (decimal)pis[j].Estimate;

                var difference = estimate - pisEstimate;
                distanceInSquare += difference * difference;
            }

            var distance = Math.Sqrt((double)distanceInSquare);
            distances.Add((decimal)distance);
        }

        return distances;
    }

    public List<decimal> CalculateDistancesToNis(
        List<List<CriteriaEstimate>> weightedNormalizedCriteriaMatrix,
        List<CriteriaEstimate> nis)
    {
        var distances = new List<decimal>();

        foreach (var t in weightedNormalizedCriteriaMatrix)
        {
            decimal distanceInSquare = 0;

            for (int j = 0; j < t.Count; j++)
            {
                var estimate = (decimal)t[j].Estimate;
                var nisEstimate = (decimal)nis[j].Estimate;

                var difference = estimate - nisEstimate;
                distanceInSquare += difference * difference;
            }

            var distance = Math.Sqrt((double)distanceInSquare);
            distances.Add((decimal)distance);
        }

        return distances;
    }
    
    public List<decimal> CalculateClosenessToPis(
        List<decimal> distancesToPis,
        List<decimal> distancesToNis)
    {
        var closenessList = new List<decimal>();

        for (int i = 0; i < distancesToPis.Count; i++)
        {
            var distanceToPis = distancesToPis[i];
            var distanceToNis = distancesToNis[i];

            var closeness = distanceToNis / (distanceToNis + distanceToPis);
            closenessList.Add(closeness);
        }

        return closenessList;
    }
}