import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';   
import axios from 'axios';
import Navbar from './Navbar';

function Video() {
  const { state } = useLocation();
  const { video } = state;  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [relatedVideos, setRelatedVideos] = useState([]);  

  
  useEffect(() => {
    async function fetchRelatedVideos() {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              key: 'AIzaSyB8TaoC6VpX_JO-4npge6QGm3zlu6WlrmA',
              part: 'snippet',
              q: 'الهلال آسيا',  
              type: 'video',
              maxResults:9,  
            },
          }
        );
        
        const filteredVideos = response.data.items.filter(
          (relatedVideo) => relatedVideo.id.videoId !== video.id.videoId
        );
        setRelatedVideos(filteredVideos);
      } catch (error) {
        console.error('Error fetching related videos from YouTube API', error);
      }
    }

    fetchRelatedVideos();
  }, [video.id.videoId]);  

   
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get('https://670119e2b52042b542d6c3c3.mockapi.io/commint');
        setComments(response.data.filter(comment => comment.videoId === video.id.videoId));  
      } catch (error) {
        console.error('Error fetching comments', error);
      }
    }
    fetchComments();
  }, [video.id.videoId]);

   
  useEffect(() => {
    async function fetchUser() {
      const storedUserId = localStorage.getItem('userId');  
      if (storedUserId) {
        try {
          const response = await axios.get(`https://670119e2b52042b542d6c3c3.mockapi.io/Login/${storedUserId}`);
          setUsername(response.data.username);  
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      }
    }
    fetchUser();
  }, []);

   
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const commentData = {
        username: username,
        comment: newComment,
        videoId: video.id.videoId,  
      };

      try {
        await axios.post('https://670119e2b52042b542d6c3c3.mockapi.io/commint', commentData);
        setComments([...comments, commentData]);
        setNewComment('');
      } catch (error) {
        console.error('Error posting comment', error);
      }
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row">
       
        <div className="flex-grow lg:w-3/4 mt-4">
          <iframe
            className="w-full h-64 lg:h-96"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h2 className="text-xl font-bold mt-4">{video.snippet.title}</h2>
          <p className="text-gray-600">{video.snippet.description}</p>

          
          <div className="mt-4">
            <h3 className="font-bold">Comments</h3>
            <form onSubmit={handleCommentSubmit} className="my-4">
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
           <button type="submit" className="btn bg-red-600 text-white hover:bg-red-700 border-none mt-2">
        Submit
    </button>
            </form>

           
            <div>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="p-2 border-t border-gray-300">
                     
                    <p>{comment.comment}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>

       
        <div className="lg:w-1/4 lg:pl-4">
          
          <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg mt-4">
            <h2 className="font-bold">Follow me on Twitter</h2>
            <p>@WL_Alhrbi</p>
          </div>

          <h3 className="font-bold text-lg mb-4 mt-4">Other Videos</h3>
           
          {relatedVideos.length > 0 ? (
            relatedVideos.map((relatedVideo) => (
              <div key={relatedVideo.id.videoId} className="mb-4">
                <div className="card bg-base-100 shadow-xl rounded-none">
                  <figure className="aspect-square overflow-hidden">
                    <img
                      src={relatedVideo.snippet.thumbnails.high.url}
                      alt={relatedVideo.snippet.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-sm line-clamp-2">{relatedVideo.snippet.title}</h2>
                    <p className="text-xs text-gray-500">{relatedVideo.snippet.channelTitle}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading other videos...</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default Video;
