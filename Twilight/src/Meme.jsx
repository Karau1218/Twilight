import { useState, useEffect } from "react"

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = useState([])
    
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage() {
        // 1. Pick a random number from 0 to the length of the array
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        
        // 2. Get the URL of that random meme
        const newUrl = allMemes[randomNumber].url
        
        // 3. Update the meme state's imageUrl property
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: newUrl
        }))
    }
    
    function handleChange(event) {
        const {value, name} = event.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                {/* ... labels and inputs stay the same ... */}
                
                {/* 4. Add the onClick listener here */}
                <button onClick={getMemeImage}>
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}