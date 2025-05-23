﻿using ReadyBusinesses.Common.Dto.BlobImage;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class PictureToPreviewString
{
    public static string Map(Picture picture)
    {
        return $"data:{picture.ContentType};base64,{Convert.ToBase64String(picture.Data)}";
    }

    public static ImagePathDto MapPictureToPath(Picture picture)
    {
        return new ImagePathDto
        {
            Path = Map(picture),
            Id = picture.Id,
        };
    }
}