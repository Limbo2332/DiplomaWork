using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReadyBusinesses.DLL.Migrations
{
    /// <inheritdoc />
    public partial class AddRecommendations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostRecommendation_Recommendation_RecommendationId",
                table: "PostRecommendation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Recommendation",
                table: "Recommendation");

            migrationBuilder.RenameTable(
                name: "Recommendation",
                newName: "Recommendations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Recommendations",
                table: "Recommendations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostRecommendation_Recommendations_RecommendationId",
                table: "PostRecommendation",
                column: "RecommendationId",
                principalTable: "Recommendations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostRecommendation_Recommendations_RecommendationId",
                table: "PostRecommendation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Recommendations",
                table: "Recommendations");

            migrationBuilder.RenameTable(
                name: "Recommendations",
                newName: "Recommendation");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Recommendation",
                table: "Recommendation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostRecommendation_Recommendation_RecommendationId",
                table: "PostRecommendation",
                column: "RecommendationId",
                principalTable: "Recommendation",
                principalColumn: "Id");
        }
    }
}
