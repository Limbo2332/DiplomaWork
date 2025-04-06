using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Topsis;

public class Solver : ISolver
{
    private readonly List<bool> MaximizedCriterias;
    public static decimal[] CriteriaWeightsForChatGpt = [0.1M, 0.1M, 0.1M, 0.1M, 0.1M, 0.1M, 0.15M, 0.05M, 0.1M, 0.2M];

    public Solver()
    {
        MaximizedCriterias = new List<bool>
        {
            true, // Локація
            true, // Чистий прибуток
            false, // Окупність бізнесу
            false, // Ціна бізнесу
            true, // Середній чек
            true, // Середній виторг
            true, // Адаптація до умов в Україні
            true, // Команда
            true, // Підтримка від колишнього власника
            true, // Популярність бізнесу
            true, // Комплексна оцінка від ШІ
        };
    }
    
    public IEnumerable<Post> GetSortedPosts(
        IEnumerable<Post> businesses, 
        List<decimal[]> criteriaMatrix, 
        decimal[] criteriaWeights)
    {
        var normalized = NormalizeCriteriaMatrix(criteriaMatrix);
        var weightedNormalized = CalculateWeightedNormalizedCriteriaMatrix(normalized, criteriaWeights);
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
    
    public decimal[,] NormalizeCriteriaMatrix(List<decimal[]> criteriaMatrix)
    {
        var currentEstimates = new decimal[criteriaMatrix.Count, criteriaMatrix[0].Length];
        
        var maximumValues = criteriaMatrix.Select(x => x.Max()).ToList();
        var minimumValues = criteriaMatrix.Select(x => x.Min()).ToList();

        for (var index = 0; index < criteriaMatrix.Count; index++)
        {
            for (var j = 0; j < criteriaMatrix[index].Length; j++)
            {
                var isMaximized = MaximizedCriterias[j];
                var xjPlus = isMaximized ? maximumValues[index] : minimumValues[index];
                var xjMinus = isMaximized ? minimumValues[index] : maximumValues[index];
                
                var currentCriteria = criteriaMatrix[index][j];

                var currentEstimate = isMaximized
                    ? (currentCriteria - xjMinus) / (xjPlus - xjMinus)
                    : (xjMinus - currentCriteria) / (xjMinus - xjPlus);
                
                currentEstimates[index, j] = currentEstimate;
            }
        }
        
        return currentEstimates;
    }

    public decimal[,] CalculateWeightedNormalizedCriteriaMatrix(decimal[,] normalizedCriteriaMatrix, decimal[] weights)
    {
        var weightedCriteriaMatrix = new decimal[normalizedCriteriaMatrix.GetLength(0), normalizedCriteriaMatrix.GetLength(1)];
        
        for (var i = 0; i < normalizedCriteriaMatrix.GetLength(0); i++)
        {
            for (var j = 0; j < normalizedCriteriaMatrix.GetLength(1); j++)
            {
                var weight = weights[j];
                
                weightedCriteriaMatrix[i, j] = normalizedCriteriaMatrix[i, j] * weight;
            }
        }
        
        return weightedCriteriaMatrix;
    }

    public (List<decimal> Pis, List<decimal> Nis) CalculatePisAndNis(decimal[,] weightedNormalizedCriteriaMatrix)
    {
        var pis = new List<decimal>();
        var nis = new List<decimal>();

        for (var j = 0; j < weightedNormalizedCriteriaMatrix.GetLength(1); j++)
        {
            var isMaximized = MaximizedCriterias[j];
            var listOfValues = new List<decimal>();

            for (var i = 0; i < weightedNormalizedCriteriaMatrix.GetLength(0); i++)
            {
                listOfValues.Add(weightedNormalizedCriteriaMatrix[i, j]);
            }
            
            pis.Add(isMaximized ? listOfValues.Max() : listOfValues.Min());
            nis.Add(isMaximized ? listOfValues.Min() : listOfValues.Max());
        }

        return (pis, nis);
    }

    public List<decimal> CalculateDistancesToPis(decimal[,] weightedNormalizedCriteriaMatrix, List<decimal> pis)
    {
        var distances = new List<decimal>();
        
        for (var i = 0; i < weightedNormalizedCriteriaMatrix.GetLength(0); i++)
        {
            decimal distanceInSquare = 0;

            for (var j = 0; j < weightedNormalizedCriteriaMatrix.GetLength(1); j++)
            {
                var difference = weightedNormalizedCriteriaMatrix[i, j] - pis[j];
                
                distanceInSquare += difference * difference;
            }

            var distance = Math.Sqrt((double) distanceInSquare);
            
            distances.Add((decimal) distance);
        }
        
        return distances;
    }
    
    public List<decimal> CalculateDistancesToNis(decimal[,] weightedNormalizedCriteriaMatrix, List<decimal> nis)
    {
        var distances = new List<decimal>();
        
        for (var i = 0; i < weightedNormalizedCriteriaMatrix.GetLength(0); i++)
        {
            decimal distanceInSquare = 0;

            for (var j = 0; j < weightedNormalizedCriteriaMatrix.GetLength(1); j++)
            {
                var difference = weightedNormalizedCriteriaMatrix[i, j] - nis[j];
                
                distanceInSquare += difference * difference;
            }

            var distance = Math.Sqrt((double) distanceInSquare);
            
            distances.Add((decimal) distance);
        }
        
        return distances;
    }

    public List<decimal> CalculateClosenessToPis(List<decimal> distancesToPis, List<decimal> distancesToNis)
    {
        var closenessList = new List<decimal>();

        for (var i = 0; i < distancesToPis.Count; i++)
        {
            var distanceToPis = distancesToPis[i];
            var distanceToNis = distancesToNis[i];

            var closeness = distanceToNis / (distanceToNis + distanceToPis);
            
            closenessList.Add(closeness);
        }

        return closenessList;
    }
}