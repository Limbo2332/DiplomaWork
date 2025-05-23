﻿using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Enums;

namespace ReadyBusinesses.DLL.Repositories.Abstract;

public interface IBusinessesRepository
{
    IQueryable<Post> GetPosts(BusinessStatus businessStatus);

    Task<Post> GetBusinessWithoutDependenciesByIdAsync(Guid id);
    
    Task<Post?> GetPostByIdAsync(Guid id);

    IEnumerable<Guid> GetSavedPostsIds(Guid userId);
    
    IEnumerable<Guid> GetViewedPostsIds(Guid currentUserId);
    
    Task SavePostAsync(Post post);
    
    Task EditPostAsync(Post post);
    
    Task EditPostAsync(Post currentPost, Post post);

    Task AddToFavoritesAsync(Post post, User user);
    
    Task RemoveFromFavoritesAsync(Guid postId, Guid userId);
    
    Task<Post?> GetBusinessAsync(Guid id);
    
    Task AddPostRecommendationAsync(Guid postId, Guid recommendationId);
    
    Task ViewPostAsync(Post post, User currentUser);
}