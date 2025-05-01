using ReadyBusinesses.Common.Dto.Criteria;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.MapperExtensions;

namespace ReadyBusinesses.DAL.UnitTests.MapperTests;

public class CriteriaToCriteriaDtoTests
{
    [Fact]
    public void ToCriteriaDto_ShouldMapCriteriaToCriteriaDtoCorrectly()
    {
        // Arrange
        var criteria = new Criteria
        {
            Id = Guid.NewGuid(),
            Name = "Test Criteria",
            Weight = 0.5,
            IsMaximized = true
        };

        // Act
        var criteriaDto = criteria.ToCriteriaDto();

        // Assert
        Assert.NotNull(criteriaDto);
        Assert.Equal(criteria.Id, criteriaDto.Id);
        Assert.Equal(criteria.Name, criteriaDto.Name);
        Assert.Equal(criteria.Weight, criteriaDto.Weight);
        Assert.Equal(criteria.IsMaximized, criteriaDto.IsMaximization);
    }

    [Fact]
    public void ToGlobalCriteriaDto_ShouldMapGlobalCriteriaToGlobalCriteriaDtoCorrectly()
    {
        // Arrange
        var globalCriteria = new GlobalCriteria
        {
            Id = Guid.NewGuid(),
            Criteria = new[]
            {
                new Criteria { Id = Guid.NewGuid(), Name = "Criteria 1", Weight = 0.5, IsMaximized = true },
                new Criteria { Id = Guid.NewGuid(), Name = "Criteria 2", Weight = 0.3, IsMaximized = false }
            }
        };

        // Act
        var globalCriteriaDto = globalCriteria.ToGlobalCriteriaDto();

        // Assert
        Assert.NotNull(globalCriteriaDto);
        Assert.Equal(globalCriteria.Id, globalCriteriaDto.Id);
        Assert.Equal(globalCriteria.Criteria.Count, globalCriteriaDto.Criteria.Length);

        for (int i = 0; i < globalCriteria.Criteria.Count; i++)
        {
            Assert.Equal(globalCriteria.Criteria.ToList()[i].Id, globalCriteriaDto.Criteria[i].Id);
            Assert.Equal(globalCriteria.Criteria.ToList()[i].Name, globalCriteriaDto.Criteria[i].Name);
            Assert.Equal(globalCriteria.Criteria.ToList()[i].Weight, globalCriteriaDto.Criteria[i].Weight);
            Assert.Equal(globalCriteria.Criteria.ToList()[i].IsMaximized, globalCriteriaDto.Criteria[i].IsMaximization);
        }
    }

    [Fact]
    public void ToCriteria_ShouldMapCriteriaDtoToCriteriaCorrectly()
    {
        // Arrange
        var criteriaDto = new CriteriaDto
        {
            Id = Guid.NewGuid(),
            Name = "Test Criteria",
            Weight = 0.5,
            IsMaximization = true
        };
        var globalCriteriaId = Guid.NewGuid();

        // Act
        var criteria = criteriaDto.ToCriteria(globalCriteriaId);

        // Assert
        Assert.NotNull(criteria);
        Assert.Equal(criteriaDto.Id, criteria.Id);
        Assert.Equal(criteriaDto.Name, criteria.Name);
        Assert.Equal(criteriaDto.Weight, criteria.Weight);
        Assert.Equal(criteriaDto.IsMaximization, criteria.IsMaximized);
        Assert.Equal(globalCriteriaId, criteria.GlobalCriteriaId);
    }

    [Fact]
    public void ToGlobalCriteria_ShouldMapGlobalCriteriaDtoToGlobalCriteriaCorrectly()
    {
        // Arrange
        var globalCriteriaDto = new GlobalCriteriaDto
        {
            Id = Guid.NewGuid(),
            Criteria = new[]
            {
                new CriteriaDto { Id = Guid.NewGuid(), Name = "Criteria 1", Weight = 0.5, IsMaximization = true },
                new CriteriaDto { Id = Guid.NewGuid(), Name = "Criteria 2", Weight = 0.3, IsMaximization = false }
            }
        };

        // Act
        var globalCriteria = globalCriteriaDto.ToGlobalCriteria();

        // Assert
        Assert.NotNull(globalCriteria);
        Assert.Equal(globalCriteriaDto.Id, globalCriteria.Id);
        Assert.Equal(globalCriteriaDto.Criteria.Length, globalCriteria.Criteria.Count);

        for (int i = 0; i < globalCriteriaDto.Criteria.Length; i++)
        {
            Assert.Equal(globalCriteriaDto.Criteria[i].Id, globalCriteria.Criteria.ToList()[i].Id);
            Assert.Equal(globalCriteriaDto.Criteria[i].Name, globalCriteria.Criteria.ToList()[i].Name);
            Assert.Equal(globalCriteriaDto.Criteria[i].Weight, globalCriteria.Criteria.ToList()[i].Weight);
            Assert.Equal(globalCriteriaDto.Criteria[i].IsMaximization, globalCriteria.Criteria.ToList()[i].IsMaximized);
        }
    }

    [Fact]
    public void ToCriteriaEstimate_ShouldMapCriteriaEstimateDtoToCriteriaEstimateCorrectly()
    {
        // Arrange
        var criteriaEstimateDto = new CriteriaEstimateDto
        {
            Id = Guid.NewGuid(),
            Estimate = 4
        };
        var globalCriteria = new GlobalCriteriaDto
        {
            Id = Guid.NewGuid(),
            Criteria = new[]
            {
                new CriteriaDto { Id = criteriaEstimateDto.Id, Name = "Test Criteria", Weight = 0.5, IsMaximization = true }
            }
        };
        var recommendation = new Recommendation { Id = Guid.NewGuid() };

        // Act
        var criteriaEstimate = criteriaEstimateDto.ToCriteriaEstimate(globalCriteria, recommendation);

        // Assert
        Assert.NotNull(criteriaEstimate);
        Assert.Equal(criteriaEstimateDto.Id, criteriaEstimate.CriteriaId);
        Assert.Equal(criteriaEstimateDto.Estimate, criteriaEstimate.Estimate);
        Assert.Equal(recommendation.Id, criteriaEstimate.RecommendationId);
        Assert.Equal(globalCriteria.Criteria.First().Id, criteriaEstimate.Criteria.Id);
    }

    [Fact]
    public void ToCriteriaEstimateDto_ShouldMapCriteriaEstimateGptToCriteriaEstimateDtoCorrectly()
    {
        // Arrange
        var criteriaEstimateGpt = new CriteriaEstimateGpt
        {
            Criterion = "Test Criteria",
            Estimate = 4
        };
        var criteria = new[]
        {
            new CriteriaDto { Id = Guid.NewGuid(), Name = "Test Criteria", Weight = 0.5, IsMaximization = true }
        };

        // Act
        var criteriaEstimateDto = criteriaEstimateGpt.ToCriteriaEstimateDto(criteria);

        // Assert
        Assert.NotNull(criteriaEstimateDto);
        Assert.Equal(criteria.First().Id, criteriaEstimateDto.Id);
        Assert.Equal(criteriaEstimateGpt.Criterion, criteriaEstimateDto.Name);
        Assert.Equal(criteriaEstimateGpt.Estimate, criteriaEstimateDto.Estimate);
    }

    [Fact]
    public void ToCriteriaDto_ShouldMapCriteriaWeightToCriteriaDtoCorrectly()
    {
        // Arrange
        var criteriaWeight = new CriteriaWeight
        {
            Criterion = "Test Criteria",
            Weight = 0.5
        };
        var globalCriteria = new GlobalCriteriaDto
        {
            Id = Guid.NewGuid(),
            Criteria = new[]
            {
                new CriteriaDto { Id = Guid.NewGuid(), Name = "Test Criteria", Weight = 0.3, IsMaximization = true }
            }
        };

        // Act
        var criteriaDto = criteriaWeight.ToCriteriaDto(globalCriteria);

        // Assert
        Assert.NotNull(criteriaDto);
        Assert.Equal(globalCriteria.Criteria.First().Id, criteriaDto.Id);
        Assert.Equal(criteriaWeight.Criterion, criteriaDto.Name);
        Assert.Equal(criteriaWeight.Weight, criteriaDto.Weight);
        Assert.Equal(globalCriteria.Criteria.First().IsMaximization, criteriaDto.IsMaximization);
    }
}