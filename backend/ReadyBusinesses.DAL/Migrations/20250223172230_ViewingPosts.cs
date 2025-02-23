using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReadyBusinesses.DLL.Migrations
{
    /// <inheritdoc />
    public partial class ViewingPosts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_ProfileAvatars_ProfileAvatarId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "PostsPhops");

            migrationBuilder.DropTable(
                name: "ProfileAvatars");

            migrationBuilder.DropTable(
                name: "Phops");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Posts",
                newName: "PriceInUah");

            migrationBuilder.RenameColumn(
                name: "HasShelter",
                table: "Posts",
                newName: "HasPhop");

            migrationBuilder.RenameColumn(
                name: "EquipmentInfo",
                table: "Posts",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Currency",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "HasEquipment",
                table: "Posts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Season",
                table: "Posts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PostId1",
                table: "Employers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Pictures",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Data = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pictures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SavedPosts",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedPosts", x => new { x.UserId, x.PostId });
                    table.ForeignKey(
                        name: "FK_SavedPosts_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SavedPosts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PostPictures",
                columns: table => new
                {
                    PostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PictureId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostPictures", x => new { x.PostId, x.PictureId });
                    table.ForeignKey(
                        name: "FK_PostPictures_Pictures_PictureId",
                        column: x => x.PictureId,
                        principalTable: "Pictures",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PostPictures_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employers_PostId1",
                table: "Employers",
                column: "PostId1");

            migrationBuilder.CreateIndex(
                name: "IX_PostPictures_PictureId",
                table: "PostPictures",
                column: "PictureId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedPosts_PostId",
                table: "SavedPosts",
                column: "PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employers_Posts_PostId1",
                table: "Employers",
                column: "PostId1",
                principalTable: "Posts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Pictures_ProfileAvatarId",
                table: "Users",
                column: "ProfileAvatarId",
                principalTable: "Pictures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employers_Posts_PostId1",
                table: "Employers");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Pictures_ProfileAvatarId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "PostPictures");

            migrationBuilder.DropTable(
                name: "SavedPosts");

            migrationBuilder.DropTable(
                name: "Pictures");

            migrationBuilder.DropIndex(
                name: "IX_Employers_PostId1",
                table: "Employers");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "HasEquipment",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Season",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "PostId1",
                table: "Employers");

            migrationBuilder.RenameColumn(
                name: "PriceInUah",
                table: "Posts",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Posts",
                newName: "EquipmentInfo");

            migrationBuilder.RenameColumn(
                name: "HasPhop",
                table: "Posts",
                newName: "HasShelter");

            migrationBuilder.CreateTable(
                name: "Phops",
                columns: table => new
                {
                    GroupNumber = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Phops", x => x.GroupNumber);
                });

            migrationBuilder.CreateTable(
                name: "ProfileAvatars",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Data = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileAvatars", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PostsPhops",
                columns: table => new
                {
                    PostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PhopNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostsPhops", x => new { x.PostId, x.PhopNumber });
                    table.ForeignKey(
                        name: "FK_PostsPhops_Phops_PhopNumber",
                        column: x => x.PhopNumber,
                        principalTable: "Phops",
                        principalColumn: "GroupNumber",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PostsPhops_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PostsPhops_PhopNumber",
                table: "PostsPhops",
                column: "PhopNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_ProfileAvatars_ProfileAvatarId",
                table: "Users",
                column: "ProfileAvatarId",
                principalTable: "ProfileAvatars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
