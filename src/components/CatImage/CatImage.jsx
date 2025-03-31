import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CatImage.module.css';

const CatImage = () => {
    const [catUrl, setCatUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCat = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search');
            setCatUrl(response.data[0].url);
        } catch (err) {
            console.error(err);
            setError('Не удалось загрузить кота :(');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCat();
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Random Cat Image</h2>

            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && catUrl && (
                <img src={catUrl} alt="cat" className={styles.img} />
            )}

            <br />
            <button className={styles.btn} onClick={fetchCat} disabled={loading}>
                {loading ? 'Загрузка...' : 'Load New Image'}
            </button>
        </div>
    );
};

export default CatImage;
