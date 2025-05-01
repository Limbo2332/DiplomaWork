using ReadyBusinesses.Common.Dto.Criteria;
using ReadyBusinesses.Common.Dto.Recommendation;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.MapperExtensions;

namespace ReadyBusinesses.DAL.UnitTests.MapperTests;

public class CreateRecommendationDtoToRecommendationTests
{
    [Fact]
    public void ToRecommendation_ShouldMapCreateRecommendationDtoToRecommendationCorrectly()
    {
        // Arrange
        var recommendationDto = new CreateRecommendationDto
        {
            Minuses = ["Test Minuses"],
            Pluses = ["Test Pluses"],
            Recommendations = ["Test Recommendations"],
            ByAi = false,
            CriteriaEstimates = new List<CriteriaEstimateDto>
            {
                new CriteriaEstimateDto { Id = Guid.NewGuid(), Estimate = 5 },
                new CriteriaEstimateDto { Id = Guid.NewGuid(), Estimate = 4 }
            }
        };
        
        var criteriaEstimates = recommendationDto.CriteriaEstimates.ToList();

        var givenById = Guid.NewGuid();
        var globalCriteria = new GlobalCriteriaDto
        {
            Criteria = new List<CriteriaDto>
            {
                new CriteriaDto { Id = criteriaEstimates[0].Id, Name = "Criteria 1" },
                new CriteriaDto { Id = criteriaEstimates[1].Id, Name = "Criteria 2" }
            }.ToArray()
        };

        // Act
        var recommendation = recommendationDto.ToRecommendation(givenById, globalCriteria);

        // Assert
        Assert.NotNull(recommendation);
        Assert.Equal(recommendationDto.Minuses, recommendation.Minuses);
        Assert.Equal(recommendationDto.Pluses, recommendation.Pluses);
        Assert.Equal(recommendationDto.Recommendations, recommendation.Recommendations);
        Assert.Equal(givenById, recommendation.GivenById);
        Assert.Equal(2, recommendation.CriteriaEstimates.Count);

        for (int i = 0; i < recommendationDto.CriteriaEstimates.Count(); i++)
        {
            Assert.Equal(criteriaEstimates[i].Id, recommendation.CriteriaEstimates.ToList()[i].CriteriaId);
            Assert.Equal(criteriaEstimates[i].Estimate, recommendation.CriteriaEstimates.ToList()[i].Estimate);
        }
    }

    [Fact]
    public void ToRecommendation_ShouldSetGivenByIdToNullWhenByAiIsTrue()
    {
        // Arrange
        var recommendationDto = new CreateRecommendationDto
        {
            Minuses = ["Test Minuses"],
            Pluses = ["Test Pluses"],
            Recommendations = ["Test Recommendations"],
            ByAi = true,
            CriteriaEstimates = new List<CriteriaEstimateDto>
            {
                new CriteriaEstimateDto { Id = Guid.NewGuid(), Estimate = 5 }
            }
        };

        var givenById = Guid.NewGuid();
        var globalCriteria = new GlobalCriteriaDto
        {
            Criteria = new List<CriteriaDto>
            {
                new CriteriaDto { Id = recommendationDto.CriteriaEstimates.ToList()[0].Id, Name = "Criteria 1" }
            }.ToArray()
        };

        // Act
        var recommendation = recommendationDto.ToRecommendation(givenById, globalCriteria);

        // Assert
        Assert.NotNull(recommendation);
        Assert.Null(recommendation.GivenById);
    }
}