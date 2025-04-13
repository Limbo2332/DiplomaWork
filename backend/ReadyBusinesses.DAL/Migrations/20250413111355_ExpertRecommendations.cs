using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReadyBusinesses.DLL.Migrations
{
    /// <inheritdoc />
    public partial class ExpertRecommendations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ByAI",
                table: "Recommendations");

            migrationBuilder.AddColumn<Guid>(
                name: "GivenById",
                table: "Recommendations",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recommendations_GivenById",
                table: "Recommendations",
                column: "GivenById");

            migrationBuilder.AddForeignKey(
                name: "FK_Recommendations_Users_GivenById",
                table: "Recommendations",
                column: "GivenById",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recommendations_Users_GivenById",
                table: "Recommendations");

            migrationBuilder.DropIndex(
                name: "IX_Recommendations_GivenById",
                table: "Recommendations");

            migrationBuilder.DropColumn(
                name: "GivenById",
                table: "Recommendations");

            migrationBuilder.AddColumn<bool>(
                name: "ByAI",
                table: "Recommendations",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
