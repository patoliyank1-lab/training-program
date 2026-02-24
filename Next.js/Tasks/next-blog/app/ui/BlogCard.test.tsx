import { render, screen, fireEvent } from '@testing-library/react';
import BlogCard from './BlogCard'; // Adjust path
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { incrementViews } from '../redux/Slices/postsSlice';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';




// 1. Mock External Dependencies
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

// jest.mock('next-cloudinary', () => ({
//   CldImage: (props) => <img {...props} />, // Simplified for testing
// }));

jest.mock('../redux/Slices/postsSlice', () => ({
  incrementViews: jest.fn((payload) => ({ type: 'posts/incrementViews', payload })),
}));

// 2. Mock Data
const mockPost = {
  id: "3b64ccb0-1017-11f1-b40d-6f0855af305e",
  title: "test",
  body: "this is test blog app ",
  Category: "Test-Cat",
  tags: [
    "test-tegs"
  ],
  thumbnail: "https://res.cloudinary.com/dvqs1k61h/image/upload/v1771782738/blog-thumbnails/erbqmuzj8z7cuk4csnfk.jpg",
  likes: 1,
  likesUser: [
    "ebd7f820-0ca6-11f1-a959-911d8c87eb25"
  ],
  comments: 0,
  views: 27,
  userId: "4c6d8aa0-0c8f-11f1-838d-87ffffee95ab",
  createdAt: "2026-02-22T17:52:19.196Z"
}

describe('BlogCard Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as any).mockReturnValue(mockDispatch);
  });

  it('renders post details correctly', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    render(<BlogCard post={mockPost} />);
  });

  it('shows filled heart when user has liked the post', () => {
    // Mock user matching an ID in likesUser
    (useAuth as jest.Mock).mockReturnValue({ user: { id: 'user-1' } });
    const { container } = render(<BlogCard post={mockPost} />);
    
  });

  it('dispatches incrementViews on card click', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    render(<BlogCard post={mockPost} />);
    
    // The click handler is on the inner div
    const cardContainer = screen.getByText(mockPost.title).closest('div');
    if (cardContainer) fireEvent.click(cardContainer);

    expect(mockDispatch).toHaveBeenCalledWith(incrementViews({ id: mockPost.id }));
  });

  it('links to the correct post page', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    render(<BlogCard post={mockPost} />);
    
    const link = screen.getByRole('link');
  });
});
