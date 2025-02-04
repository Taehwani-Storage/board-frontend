# 📝 자바스크립트 게시판 미니 프로젝트 (프론트엔드)

이 프로젝트는 **React**를 활용하여 백엔드(Spring)에서 구현된 게시판의 프론트엔드를 담당합니다.  
사용자는 **게시글 목록 조회, 게시글 작성, 수정, 삭제, 댓글 기능**을 웹 UI를 통해 사용할 수 있습니다.  

## 📌 프로젝트 환경
- **프레임워크**: React (JSX 기반)
- **상태관리**: React Hooks (useState, useEffect)
- **라우팅**: React Router
- **스타일링**: Tailwind CSS
- **API 통신**: Axios (RESTful API)
- **아이콘**: Lucide-react

## 📂 프로젝트 폴더 구조
```
/src
 ├── components  # UI 컴포넌트 폴더
 │   ├── PostList.jsx  # 게시글 목록
 │   ├── PostDetail.jsx  # 게시글 상세 보기
 │   ├── PostForm.jsx  # 게시글 작성/수정 폼
 │   ├── CommentList.jsx  # 댓글 목록
 │   └── CommentForm.jsx  # 댓글 작성 폼
 ├── pages
 │   ├── Home.jsx  # 메인 페이지
 │   ├── PostPage.jsx  # 게시글 페이지
 │   ├── EditPostPage.jsx  # 게시글 수정 페이지
 │   └── NotFound.jsx  # 404 페이지
 ├── api
 │   ├── postApi.js  # 게시판 관련 API 요청
 │   └── commentApi.js  # 댓글 관련 API 요청
 ├── App.js  # 메인 컴포넌트
 ├── index.js  # 진입점
 └── styles.css  # 스타일링
```

## 📌 게시글 목록 보기 (PostList.jsx)
```jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.error("게시글을 불러오는 중 오류 발생:", error));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">📜 게시글 목록</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="border p-4 my-2">
            <Link to={`/posts/${post.id}`} className="text-xl text-blue-500">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
```

## 🖊️ 게시글 작성 및 수정 (PostForm.jsx)
```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostForm = ({ post }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, content };

    try {
      if (post) {
        await axios.put(`/api/posts/${post.id}`, postData);
      } else {
        await axios.post("/api/posts", postData);
      }
      navigate("/");
    } catch (error) {
      console.error("게시글 저장 중 오류 발생:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold">{post ? "✏️ 게시글 수정" : "📝 새 게시글 작성"}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 my-2"
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 my-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {post ? "수정 완료" : "작성 완료"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
```

## 🗑️ 게시글 삭제 기능
```jsx
import axios from "axios";

const deletePost = async (postId) => {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    try {
      await axios.delete(`/api/posts/${postId}`);
      alert("삭제되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  }
};
```

## 💬 댓글 기능
```jsx
import { useEffect, useState } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`/api/posts/${postId}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error("댓글을 불러오는 중 오류 발생:", error));
  }, [postId]);

  return (
    <div>
      <h3 className="text-lg font-bold">💬 댓글</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id} className="border p-2 my-2">
            {comment.text} - <span className="text-gray-500">{comment.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
```

## 🌐 RESTful API 연동
```js
import axios from "axios";

export const getPosts = () => axios.get("/api/posts");
export const getPostById = (id) => axios.get(`/api/posts/${id}`);
export const createPost = (data) => axios.post("/api/posts", data);
export const updatePost = (id, data) => axios.put(`/api/posts/${id}`, data);
export const deletePost = (id) => axios.delete(`/api/posts/${id}`);
```

## 🚀 결론
이 게시판 프론트엔드 프로젝트는 **React, Axios, Tailwind CSS**를 활용하여 직관적이고 간결한 UI를 제공합니다.  
RESTful API를 통해 백엔드와 연동되며, 게시글 및 댓글 CRUD 기능을 포함하고 있습니다.  
추가 기능으로 **페이징 처리, 좋아요 기능, 사용자 인증** 등을 확장할 수 있습니다.  
🔥 더욱 완성도 높은 프로젝트를 위해 발전시켜 보세요! 🎉
