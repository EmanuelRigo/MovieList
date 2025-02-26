export async function CreateMovie(movieData: any): Promise<any> {
    console.log(movieData);
    const res = await fetch("http://localhost:9000/api/movies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
    });
    console.log("holaaaaaa");
    const data = await res.json();
    console.log(data);
    return data;
}

export async function getMovieById(id: string): Promise<any> {
    const res = await fetch(`http://localhost:9000/api/movies/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch movie.");
    }
    const data = await res.json();
    return data;
}

export async function getMovieByIdUpdate(id: string, movieData: any): Promise<any> {
    const res = await fetch(`http://localhost:9000/api/movies/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
    });
    if (!res.ok) {
        throw new Error("Failed to update movie.");
    }
    const data = await res.json();
    return data;
}