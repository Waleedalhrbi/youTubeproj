import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';   

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import FilterBar from './FilterBar';

function Home() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();   

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              key: 'AIzaSyB8TaoC6VpX_JO-4npge6QGm3zlu6WlrmA',
              part: 'snippet',
              q: 'الهلال آسيا',
              type: 'video',
              maxResults: 25,
            },
          }
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching data from YouTube API', error);
      }
    }

    fetchData();
  }, []);

  const handleVideoClick = (video) => {
    
    navigate(`/video/${video.id.videoId}`, { state: { video } });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow pl-0 lg:pl-64">
        <Navbar />
        <FilterBar />
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.length > 0 ? (
              videos.map((video) => (
                <div
                  key={video.id.videoId}
                  className="card bg-base-100 shadow-xl rounded-none cursor-pointer"
                  onClick={() => handleVideoClick(video)}   
                >
                  <figure className="aspect-square overflow-hidden">
                    <img
                      src={video.snippet.thumbnails.high.url}
                      alt={video.snippet.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-sm line-clamp-2">{video.snippet.title}</h2>
                    <p className="text-xs text-gray-500">{video.snippet.channelTitle}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading videos...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
