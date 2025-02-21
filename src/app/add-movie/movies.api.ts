export async function CreateMovie(movieData: any): Promise<any> {
    console.log(movieData)
    const res = await fetch("http://localhost:9000/api/movies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
       
        body: JSON.stringify(movieData),
    });
    console.log("holaaaaaa")
    const data = await res.json();
    console.log(data);
    return data;
}