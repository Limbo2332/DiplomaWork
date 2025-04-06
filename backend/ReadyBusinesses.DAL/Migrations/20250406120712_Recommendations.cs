using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReadyBusinesses.DLL.Migrations
{
    /// <inheritdoc />
    public partial class Recommendations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Recommendation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CriteriaMatrix = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CriteriaWeights = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RatingScore = table.Column<double>(type: "float(18)", precision: 18, scale: 4, nullable: false),
                    LocationScore = table.Column<double>(type: "float(18)", precision: 18, scale: 4, nullable: false),
                    FinancialScore = table.Column<double>(type: "float(18)", precision: 18, scale: 4, nullable: false),
                    AdaptationScore = table.Column<double>(type: "float(18)", precision: 18, scale: 4, nullable: false),
                    TeamScore = table.Column<double>(type: "float(18)", precision: 18, scale: 4, nullable: false),
                    SupportScore = table.Column<double>(type: "float(18)", precision: 18, scale: 4, nullable: false),
                    PopularityScore = table.Column<double>(type: "float(18)", precision: 18, scale: 4, nullable: false),
                    ShiScore = table.Column<double>(type: "float(18)", precision: 18, scale: 4, nullable: false),
                    Pluses = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Minuses = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Recommendations = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recommendation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PostRecommendation",
                columns: table => new
                {
                    PostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RecommendationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostRecommendation", x => new { x.PostId, x.RecommendationId });
                    table.ForeignKey(
                        name: "FK_PostRecommendation_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PostRecommendation_Recommendation_RecommendationId",
                        column: x => x.RecommendationId,
                        principalTable: "Recommendation",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PostRecommendation_RecommendationId",
                table: "PostRecommendation",
                column: "RecommendationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PostRecommendation");

            migrationBuilder.DropTable(
                name: "Recommendation");
        }
    }
}
