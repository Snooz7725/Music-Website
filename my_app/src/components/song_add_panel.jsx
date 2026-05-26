import './song_add_panel.css'
import { useState } from "react"

function SongAddPanel() {
    async function handleInfoScrape() {
        try {
            // Search using BOTH artist + recording name
            const res = await fetch(
                '/api/data?type=addSong',
                {
                    method: "POST",
                    body: {
                        data: {
                            artist: searchData.artist,
                            song: searchData.song
                        }
                    }
                }
            );

            console.log(JSON.stringify(res, null, 2))
        } catch (err) {
            console.error('Error:', err)
        }
    }

    const [ searchData, setSearchData ] = useState({
        artist: null,
        song: null
    })

    console.log("artist: " + searchData.artist + "\n" + "song: " + searchData.song)

    return (
        <div className="song-add-panel-wrapper">
            <div className="hero">
                <img src="./assets/drummer.jpg" alt=""/>
                <span>Looking For Something?</span>
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder='Enter artist'onChange={(e) => setSearchData(prev => ({
                    ...prev,
                    "artist": e.target.value
                }))}/>
                <input type="text" placeholder="Enter song" onChange={(e) => setSearchData(prev => ({
                    ...prev,
                    "song": e.target.value
                }))}/>
            </div>
            <hr></hr>
            <button className="search-btn" onClick={ () => handleInfoScrape() }>
                <img src="/assets/search_btn.png" alt="" />
            </button>
        </div>
    )
};

export default SongAddPanel

// FIND ARTIST
// async function handleInfoScrape() {
//     const artist = "Kendrick Lamar"
//     const res = await fetch(
//         `https://musicbrainz.org/ws/2/artist/?query=artist:${artist}&fmt=json`,
//         {
//             headers: {
//                 "User-Agent": "MyApp/1.0 (me@example.com)"
//             }
//         }
//     )

//     const data = await res.json()
//     console.log("data: \n" + JSON.stringify(data, null, 2))
//     const id = data.artists[0].id

//     const res2 = await fetch(
//         `https://musicbrainz.org/ws/2/artist/${id}?fmt=json`,
//         {
//             headers: {
//                 "User-Agent": "MyApp/1.0 (me@example.com)"
//             }
//         }
//     )
    
//     const data2 = await res2.json()
//     console.log("data2:\n" + JSON.stringify(data2, null, 2))

//     setArtist(data2)
// }

// FIND SONG
// async function handleInfoScrape() {
//   const artist = 'Kendrick Lamar';
//   const song = 'HUMBLE.';

//   try {
//     // Search using BOTH artist + recording name
//     const res = await fetch(
//       `https://musicbrainz.org/ws/2/recording/?query=` +
//       `recording:${encodeURIComponent(song)}%20AND%20artist:${encodeURIComponent(artist)}` +
//       `&fmt=json`,
//       {
//         headers: {
//           'User-Agent': 'MyApp/1.0 (me@example.com)'
//         }
//       }
//     );

//     const data = await res.json();

//     console.log('search results:\n', data);

//     const recording = data.recordings?.[0];

//     if (!recording) {
//       console.log('No matching song found');
//       return;
//     }

//     const id = recording.id;

//     // Get detailed recording info
//     const res2 = await fetch(
//       `https://musicbrainz.org/ws/2/recording/${id}?fmt=json&inc=artists+releases`,
//       {
//         headers: {
//           'User-Agent': 'MyApp/1.0 (me@example.com)'
//         }
//       }
//     );

//     const data2 = await res2.json();

//     console.log('recording details:\n', data2);

//     // Send to backend
//     const res3 = await fetch('/api/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         data: data2
//       })
//     });

//     const result = await res3.json();

//     console.log('backend response:\n', result);

//   } catch (err) {
//     console.error('Error:', err);
//   }
// }

// FIND ALBUM
// async function handleInfoScrape() {
//   const artist = 'Kendrick Lamar';
//   const album = 'HUMBLE.';

//   try {
//     // Search using BOTH artist + recording name
//     const res = await fetch(
//       `https://musicbrainz.org/ws/2/release-group/?query=` +
//       `release:${encodeURIComponent(album)}%20AND%20artist:${encodeURIComponent(artist)}` +
//       `&fmt=json`,
//       {
//         headers: {
//           'User-Agent': 'MyApp/1.0 (me@example.com)'
//         }
//       }
//     );

//     const data = await res.json();

//     console.log('search results:\n', data);

//     const recording = data.recordings?.[0];

//     if (!recording) {
//       console.log('No matching song found');
//       return;
//     }

//     const id = recording.id;

//     // Get detailed recording info
//     const res2 = await fetch(
//       `https://musicbrainz.org/ws/2/recording/${id}?fmt=json&inc=artists+releases`,
//       {
//         headers: {
//           'User-Agent': 'MyApp/1.0 (me@example.com)'
//         }
//       }
//     );

//     const data2 = await res2.json();

//     console.log('recording details:\n', data2);

//     // Send to backend
//     const res3 = await fetch('/api/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         data: data2
//       })
//     });

//     const result = await res3.json();

//     console.log('backend response:\n', result);

//   } catch (err) {
//     console.error('Error:', err);
//   }
// }