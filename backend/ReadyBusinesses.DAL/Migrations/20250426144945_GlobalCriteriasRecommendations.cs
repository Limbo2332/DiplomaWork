using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReadyBusinesses.DLL.Migrations
{
    /// <inheritdoc />
    public partial class GlobalCriteriasRecommendations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdaptationScore",
                table: "Recommendations");

            migrationBuilder.DropColumn(
                name: "CriteriaMatrix",
                table: "Recommendations");

            migrationBuilder.DropColumn(
                name: "CriteriaWeights",
                table: "Recommendations");

            migrationBuilder.DropColumn(
                name: "FinancialScore",
                table: "Recommendations");

            migrationBuilder.DropColumn(
                name: "LocationScore",
                table: "Recommendations");

            migrationBuilder.DropColumn(
                name: "PopularityScore",
                table: "Recommendations");

            migrationBuilder.DropColumn(
                name: "RatingScore",
                table: "Recommendations");

            migrationBuilder.DropColumn(
                name: "ShiScore",
                table: "Recommendations");

            migrationBuilder.DropColumn(
                name: "SupportScore",
                table: "Recommendations");

            migrationBuilder.DropColumn(
                name: "TeamScore",
                table: "Recommendations");

            migrationBuilder.AddColumn<bool>(
                name: "Fresh",
                table: "GlobalCriteria",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "CriteriaEstimate",
                columns: table => new
                {
                    CriteriaId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RecommendationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Estimate = table.Column<double>(type: "float(18)", precision: 18, scale: 4, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CriteriaEstimate", x => new { x.CriteriaId, x.RecommendationId });
                    table.ForeignKey(
                        name: "FK_CriteriaEstimate_Criteria_CriteriaId",
                        column: x => x.CriteriaId,
                        principalTable: "Criteria",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CriteriaEstimate_Recommendations_RecommendationId",
                        column: x => x.RecommendationId,
                        principalTable: "Recommendations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CriteriaEstimate_RecommendationId",
                table: "CriteriaEstimate",
                column: "RecommendationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CriteriaEstimate");

            migrationBuilder.DropColumn(
                name: "Fresh",
                table: "GlobalCriteria");

            migrationBuilder.AddColumn<double>(
                name: "AdaptationScore",
                table: "Recommendations",
                type: "float(18)",
                precision: 18,
                scale: 4,
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "CriteriaMatrix",
                table: "Recommendations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CriteriaWeights",
                table: "Recommendations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "FinancialScore",
                table: "Recommendations",
                type: "float(18)",
                precision: 18,
                scale: 4,
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "LocationScore",
                table: "Recommendations",
                type: "float(18)",
                precision: 18,
                scale: 4,
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PopularityScore",
                table: "Recommendations",
                type: "float(18)",
                precision: 18,
                scale: 4,
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "RatingScore",
                table: "Recommendations",
                type: "float(18)",
                precision: 18,
                scale: 4,
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ShiScore",
                table: "Recommendations",
                type: "float(18)",
                precision: 18,
                scale: 4,
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SupportScore",
                table: "Recommendations",
                type: "float(18)",
                precision: 18,
                scale: 4,
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TeamScore",
                table: "Recommendations",
                type: "float(18)",
                precision: 18,
                scale: 4,
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
