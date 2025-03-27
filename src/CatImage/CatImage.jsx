import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './CatImage.module.css'


const CatImage = () => {
    const [catUrl, setCatUrl] = useState('')

    const fetchCat = async () => {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search')
            setCatUrl(response.data[0].url)
        }
        catch (err) {
            console.error(err);
        }
    }
    
    useEffect(() => {
        fetchCat()
    }, [])
    
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Random Cat Image
            </h2>
            {catUrl && <img src={catUrl} alt="cat" className={styles.img} />}
            <br />
            <button className={styles.btn} onClick={fetchCat}>Load New Image</button>
        </div>
    )
}
export default CatImage;