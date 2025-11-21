"use client";

import { gql } from "@apollo/client";
import { useLazyQuery, useQuery } from "@apollo/client/react";
import { useState } from "react";

type Users = {
  id: string;
  name: string;
  username: string;
  phone: string;
  website: string;
};

type Blogs = {
  id: string;
  body: string;
  title: string;
};

type BlogWithAuthor = {
  id: string;
  body: string;
  title: string;
  user: {
    name: string;
  };
};

type BlogWithUsernameQuery = {
  blog: BlogWithAuthor;
};

type UsersQueryResponse = {
  users: Users[];
};
type BlogsQueryResponse = {
  blogs: Blogs[];
};

const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      name
      username
      phone
      website
    }
  }
`;
const GET_ALL_BLOGS = gql`
  query Getblogs {
    blogs {
      id
      body
      title
    }
  }
`;
const GET_BLOG_By_ID = gql`
  query Blog($blogId: ID!) {
    blog(id: $blogId) {
      id
      body
      title
      user {
        name
      }
    }
  }
`;

export default function GraphQL() {
  const [blogId, setBlogId] = useState<string>("");
  const {
    data: userData,
    loading,
    error,
  } = useQuery<UsersQueryResponse>(GET_ALL_USERS);
  const { data: blogsData, loading: blogsLoading } =
    useQuery<BlogsQueryResponse>(GET_ALL_BLOGS);

  const [fetchBlog, { called, loading: loadingBlog, data: blogData }] =
    useLazyQuery<BlogWithUsernameQuery>(GET_BLOG_By_ID);
  console.log(error);
  return (
    <div className="max-w-7xl mx-auto text-center">
      <input
        type="number"
        min={1}
        max={100}
        placeholder="enter blog id from 1 to 100"
        value={blogId}
        onChange={(e) => setBlogId(e.target.value)}
      />
      <button
        onClick={() => {
          if (!blogId) return;
          fetchBlog({ variables: { blogId: blogId } });
        }}
      >
        Get Blog
      </button>
      {loadingBlog && <div>Loading Blog...</div>}
      {blogData && (
        <div>
          <div>title: {blogData.blog.title} </div>
          <div>Author Name: {blogData.blog.user.name} </div>
          <div>blog {blogData.blog.body} </div>
        </div>
      )}
      {loading && <div>Loading Users...</div>}
      {blogsLoading && <div>Loading Blogs...</div>}
      {userData &&
        userData.users.map((data) => (
          <div key={data.id}>
            <div>Name: {data.name}</div>
            <div>Username: {data.username}</div>
            <div>Phone: {data.phone}</div>
            <div>Website: {data.website}</div>
          </div>
        ))}
      {blogsData &&
        blogsData.blogs.map((data) => (
          <div key={data.id}>
            <div>Title: {data.title}</div>
            <div>content: {data.body}</div>
          </div>
        ))}
    </div>
  );
}
