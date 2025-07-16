import React, { useState, useEffect } from 'react';

// Icons as React components
const HomeIcon = ({ active }) => (
  <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2L3 9v11h4v-6h6v6h4V9l-7-7z"/>
  </svg>
);

const SearchIcon = ({ active }) => (
  <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
  </svg>
);

const LibraryIcon = ({ active }) => (
  <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
  </svg>
);

const PlayIcon = () => (
  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
  </svg>
);

const PauseIcon = () => (
  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
  </svg>
);

const NextIcon = () => (
  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"/>
  </svg>
);

const PrevIcon = () => (
  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path d="M15.445 14.832A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4A1 1 0 0010 14v-2.798l5.445 3.63z"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-green-500' : 'text-gray-400'}`} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
  </svg>
);

const MoreIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/>
  </svg>
);

const VolumeIcon = () => (
  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.759L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.797-3.759a1 1 0 011.617.759zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"/>
  </svg>
);

// Sample data for the Spotify clone
export const sampleData = {
  user: {
    name: "John Doe",
    profileImage: "https://images.unsplash.com/photo-1736075469184-1fd9d7683ee7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxtdXNpY2lhbiUyMGFydGlzdHxlbnwwfHx8fDE3NTI2MDE3NDd8MA&ixlib=rb-4.1.0&q=85"
  },
  recentlyPlayed: [
    {
      id: 1,
      title: "Daily Mix 1",
      description: "Post Malone, Lil Nas X, and more",
      image: "https://images.unsplash.com/photo-1587731556938-38755b4803a6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtfGVufDB8fHx8MTc1MjY0MDUyMHww&ixlib=rb-4.1.0&q=85",
      type: "playlist"
    },
    {
      id: 2,
      title: "Chill Vibes",
      description: "Relaxing music for work and study",
      image: "https://images.unsplash.com/photo-1619983081563-430f63602796?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGFsYnVtfGVufDB8fHx8MTc1MjY0MDUyMHww&ixlib=rb-4.1.0&q=85",
      type: "playlist"
    },
    {
      id: 3,
      title: "Summer Hits 2025",
      description: "The hottest tracks of the season",
      image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMGFsYnVtfGVufDB8fHx8MTc1MjY0MDUyMHww&ixlib=rb-4.1.0&q=85",
      type: "playlist"
    },
    {
      id: 4,
      title: "Workout Motivation",
      description: "High-energy tracks for your gym session",
      image: "https://images.pexels.com/photos/33003435/pexels-photo-33003435.jpeg",
      type: "playlist"
    },
    {
      id: 5,
      title: "Jazz Classics",
      description: "Timeless jazz standards",
      image: "https://images.pexels.com/photos/33003437/pexels-photo-33003437.jpeg",
      type: "playlist"
    },
    {
      id: 6,
      title: "Indie Rock",
      description: "Alternative and indie rock favorites",
      image: "https://images.pexels.com/photos/6826021/pexels-photo-6826021.jpeg",
      type: "playlist"
    }
  ],
  madeForYou: [
    {
      id: 7,
      title: "Discover Weekly",
      description: "Your weekly mixtape of fresh music",
      image: "https://images.unsplash.com/photo-1563009283-2e1a585c4d53?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxtdXNpY2lhbiUyMGFydGlzdHxlbnwwfHx8fDE3NTI2MDE3NDd8MA&ixlib=rb-4.1.0&q=85",
      type: "playlist"
    },
    {
      id: 8,
      title: "Release Radar",
      description: "New music from artists you follow",
      image: "https://images.unsplash.com/photo-1736075468980-48b967996239?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxtdXNpY2lhbiUyMGFydGlzdHxlbnwwfHx8fDE3NTI2MDE3NDd8MA&ixlib=rb-4.1.0&q=85",
      type: "playlist"
    },
    {
      id: 9,
      title: "Your Top Songs 2024",
      description: "Your most played tracks this year",
      image: "https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0cmVhbWluZ3xlbnwwfHx8fDE3NTI2MzM5MjZ8MA&ixlib=rb-4.1.0&q=85",
      type: "playlist"
    }
  ],
  currentSong: {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    image: "https://images.unsplash.com/photo-1570993492903-ba4c3088f100?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMHN0cmVhbWluZ3xlbnwwfHx8fDE3NTI2MzM5MjZ8MA&ixlib=rb-4.1.0&q=85",
    duration: "3:20",
    currentTime: "1:45",
    isPlaying: true,
    isLiked: true
  }
};

// Sidebar Component
export const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'search', label: 'Search', icon: SearchIcon },
    { id: 'library', label: 'Your Library', icon: LibraryIcon }
  ];

  return (
    <div className="w-64 bg-black text-white p-6 flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Spotify</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon active={activeTab === item.id} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-4">PLAYLISTS</h3>
          <ul className="space-y-2">
            <li><button className="text-sm text-gray-400 hover:text-white">Liked Songs</button></li>
            <li><button className="text-sm text-gray-400 hover:text-white">Downloaded</button></li>
            <li><button className="text-sm text-gray-400 hover:text-white">My Playlist #1</button></li>
            <li><button className="text-sm text-gray-400 hover:text-white">My Playlist #2</button></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

// Main Content Component
export const MainContent = ({ activeTab }) => {
  if (activeTab === 'search') {
    return <SearchView />;
  } else if (activeTab === 'library') {
    return <LibraryView />;
  }
  
  return <HomeView />;
};

// Home View Component
const HomeView = () => {
  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-y-auto">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Good afternoon</h2>
        </div>
        
        {/* Recently Played Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {sampleData.recentlyPlayed.slice(0, 6).map(item => (
            <div key={item.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group">
              <div className="flex items-center space-x-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{item.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{item.description}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400">
                    <PlayIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Made for You Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Made for You</h2>
            <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sampleData.madeForYou.map(item => (
              <div key={item.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group">
                <div className="relative mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full aspect-square rounded object-cover"
                  />
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400">
                      <PlayIcon />
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-white mb-2 truncate">{item.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recently Played Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recently Played</h2>
            <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {sampleData.recentlyPlayed.map(item => (
              <div key={item.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group">
                <div className="relative mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full aspect-square rounded object-cover"
                  />
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400">
                      <PlayIcon />
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-white mb-2 truncate">{item.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Search View Component
const SearchView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const categories = [
    { name: 'Pop', color: 'bg-red-500', image: 'https://images.unsplash.com/photo-1598698287642-9ceaf9a7a011?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMHN0cmVhbWluZ3xlbnwwfHx8fDE3NTI2MzM5MjZ8MA&ixlib=rb-4.1.0&q=85' },
    { name: 'Hip-Hop', color: 'bg-orange-500', image: 'https://images.unsplash.com/photo-1587731556938-38755b4803a6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtfGVufDB8fHx8MTc1MjY0MDUyMHww&ixlib=rb-4.1.0&q=85' },
    { name: 'Rock', color: 'bg-blue-500', image: 'https://images.unsplash.com/photo-1619983081563-430f63602796?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGFsYnVtfGVufDB8fHx8MTc1MjY0MDUyMHww&ixlib=rb-4.1.0&q=85' },
    { name: 'Electronic', color: 'bg-purple-500', image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMGFsYnVtfGVufDB8fHx8MTc1MjY0MDUyMHww&ixlib=rb-4.1.0&q=85' },
    { name: 'Jazz', color: 'bg-green-500', image: 'https://images.pexels.com/photos/33003435/pexels-photo-33003435.jpeg' },
    { name: 'Classical', color: 'bg-yellow-500', image: 'https://images.pexels.com/photos/33003437/pexels-photo-33003437.jpeg' }
  ];

  const mockSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Mock search results
    const mockResults = sampleData.recentlyPlayed.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(mockResults);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      mockSearch(searchQuery);
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-y-auto">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Search</h2>
          <div className="relative max-w-md">
            <SearchIcon active />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to listen to?"
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-full py-3 px-12 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        
        {searchQuery && searchResults.length > 0 ? (
          <div>
            <h3 className="text-xl font-bold mb-4">Search Results</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {searchResults.map(item => (
                <div key={item.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group">
                  <div className="relative mb-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full aspect-square rounded object-cover"
                    />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400">
                        <PlayIcon />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-white mb-2 truncate">{item.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold mb-4">Browse all</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {categories.map((category, index) => (
                <div key={index} className={`${category.color} rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity relative overflow-hidden h-32`}>
                  <h3 className="text-white font-bold text-xl mb-2">{category.name}</h3>
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="absolute -bottom-2 -right-2 w-20 h-20 object-cover rounded transform rotate-12"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Library View Component
const LibraryView = () => {
  const [filter, setFilter] = useState('all');
  
  const filters = ['All', 'Playlists', 'Artists', 'Albums'];
  
  const libraryItems = [
    ...sampleData.recentlyPlayed,
    ...sampleData.madeForYou
  ];

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-y-auto">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Your Library</h2>
          <div className="flex space-x-2 mb-6">
            {filters.map(filterName => (
              <button
                key={filterName}
                onClick={() => setFilter(filterName.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === filterName.toLowerCase()
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filterName}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          {libraryItems.map(item => (
            <div key={item.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">{item.title}</h3>
                <p className="text-sm text-gray-400 truncate">{item.description}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400">
                  <PlayIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Player Component
export const Player = () => {
  const [isPlaying, setIsPlaying] = useState(sampleData.currentSong.isPlaying);
  const [isLiked, setIsLiked] = useState(sampleData.currentSong.isLiked);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(52); // 52% progress (1:45 / 3:20)

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center space-x-4 w-1/4">
          <img 
            src={sampleData.currentSong.image} 
            alt={sampleData.currentSong.title}
            className="w-14 h-14 rounded object-cover"
          />
          <div className="min-w-0">
            <h4 className="text-white font-semibold truncate">{sampleData.currentSong.title}</h4>
            <p className="text-gray-400 text-sm truncate">{sampleData.currentSong.artist}</p>
          </div>
          <button onClick={toggleLike} className="ml-2">
            <HeartIcon filled={isLiked} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 w-1/2">
          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-white">
              <PrevIcon />
            </button>
            <button 
              onClick={togglePlay}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className="text-gray-400 hover:text-white">
              <NextIcon />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-gray-400 w-10">{sampleData.currentSong.currentTime}</span>
            <div className="flex-1 bg-gray-600 rounded-full h-1">
              <div 
                className="bg-white rounded-full h-1 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-10">{sampleData.currentSong.duration}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 w-1/4 justify-end">
          <button>
            <VolumeIcon />
          </button>
          <div className="w-24 bg-gray-600 rounded-full h-1">
            <div 
              className="bg-white rounded-full h-1"
              style={{ width: `${volume}%` }}
            />
          </div>
          <button>
            <MoreIcon />
          </button>
        </div>
      </div>
    </div>
  );
};