using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReadyBusinesses.DLL.Migrations
{
    /// <inheritdoc />
    public partial class CascadeDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Criteria_GlobalCriteria_GlobalCriteriaId",
                table: "Criteria");

            migrationBuilder.AddForeignKey(
                name: "FK_Criteria_GlobalCriteria_GlobalCriteriaId",
                table: "Criteria",
                column: "GlobalCriteriaId",
                principalTable: "GlobalCriteria",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Criteria_GlobalCriteria_GlobalCriteriaId",
                table: "Criteria");

            migrationBuilder.AddForeignKey(
                name: "FK_Criteria_GlobalCriteria_GlobalCriteriaId",
                table: "Criteria",
                column: "GlobalCriteriaId",
                principalTable: "GlobalCriteria",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
