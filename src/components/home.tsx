import { useState, useEffect } from 'react';


const Home = () => {
    const [price, setData] = useState<any>([]);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/stock/sse')

        eventSource.onopen = () => {
            console.log('SSE connection opened.');
        };

        // eventSource.addEventListener('message', (event) => {
        //     console.log(event);
        //     const newData = JSON.parse(event.data);
        //     setData(() => newData);
        // })

        eventSource.onmessage = (e) => {
            try {
                const newData = JSON.parse(e.data);
                console.log(newData)
;                setData((prevData: any) => newData.price);
            } catch (err) {
                console.error(err);
            }
        }

        eventSource.onerror = (err) => {
            console.error('Error with SSE connection:', err);
            console.error('Error event details:', err.type, err.eventPhase);
            eventSource.close();
        };

        
        return () => {
            eventSource.close();
        };
    }, []);

    return (
      <div>
        <h1>Home</h1>
        <p>Home page</p>
        <div>AAPL</div>
        <div>Price: {price}</div>
        {/* <ul>
            {data.map((item: any, index: any) => (
                <li key={index}>{item}</li>
            ))}
        </ul> */}
      </div>
    );
  };
  
  export default Home;