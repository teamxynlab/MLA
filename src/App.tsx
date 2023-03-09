import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [imageInput, setImageInput] = useState<File | null>(null);
    const [imageName, setImageName] = useState("No image selected yet.");

    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const [imageUploaded, setImageUploaded] = useState(false);

    const [isISLoading, setIsISLoading] = useState(false);
    const [isShowISOutput, setIsShowISOutput] = useState<boolean>();
    const [ISOutputDir, setISOutputDir] = useState<string>();

    const [isFTALoading, setIsFTALoading] = useState(false);
    const [isShowFTAOutput, setIsShowFTAOutput] = useState<boolean>();
    const [FTAOutputDir, setFTAOutputDir] = useState<string>();

    const [isTODLoading, setIsTODLoading] = useState(false);
    const [isShowTODutput, setIsShowTODutput] = useState<boolean>();
    const [TODutputDir, setTODutputDir] = useState<string>();

    useEffect(() => {
        if (imageInput) setImageName(imageInput.name);
    }, [imageInput]);

    const fetchISOutput = async () => {
        setIsISLoading(true);

        const response = await fetch("http://127.0.0.1:8000/is");
        const res = await response.json();

        setIsShowISOutput(res.success);
        setISOutputDir(res.image_dir);
        setIsISLoading(false);
    };

    const fetchFTAOutput = async () => {
        setIsFTALoading(true);

        const response = await fetch("http://127.0.0.1:8000/fta");
        const res = await response.json();

        setIsShowFTAOutput(res.success);
        setFTAOutputDir(res.image_dir);
        setIsFTALoading(false);
    };

    const fetchTODutput = async () => {
        setIsTODLoading(true);

        const response = await fetch("http://127.0.0.1:8000/tod");
        const res = await response.json();

        setIsShowTODutput(res.success);
        setTODutputDir(res.image_dir);
        setIsTODLoading(false);
    };

    const uploadImage = async () => {
        setImageUploaded(false);
        setIsShowISOutput(false);
        setIsUploadLoading(true);

        const formData = new FormData();

        if (imageInput) {
            if (
                !(
                    imageInput.name.includes("png") ||
                    imageInput.name.includes("PNG")
                )
            ) {
                alert("Please upload a .png file!");
                return;
            }

            formData.append("image", imageInput);
        }

        const response = await fetch("http://127.0.0.1:8000/upload", {
            method: "POST",
            body: formData,
        });

        const res = await response.json();

        setImageInput(null);
        setIsUploadLoading(false);

        if (res.success) {
            setImageUploaded(true);
            alert("Image successfully uploaded!");
        }
    };

    return (
        <main className="container">
            <nav className="topnav">
                <p>&copy; 2023 xynlab</p>
                <div className="links">
                    <a
                        href="https://github.com/teamxynlab/MLA"
                        target="_blank"
                        className="link"
                    >
                        Source
                    </a>
                    <a
                        href="https://github.com/teamxynlab/MLA-API"
                        target="_blank"
                        className="link"
                    >
                        API
                    </a>
                    <a
                        href="https://github.com/xyntechx/Manga-Layout-Analysis"
                        target="_blank"
                        className="link"
                    >
                        Train
                    </a>
                </div>
            </nav>
            <h1 className="title">Manga Layout Analysis via Deep Learning</h1>
            <form
                action="http://127.0.0.1:8000/upload"
                encType="multipart/form-data"
                method="post"
                onSubmit={(e) => {
                    e.preventDefault();
                    uploadImage();
                }}
                className="form"
            >
                <label htmlFor="image" className="upload">
                    <input
                        type="file"
                        accept="image/png"
                        name="image"
                        id="image"
                        style={{ display: "none" }}
                        onChange={(e) =>
                            e.target.files && setImageInput(e.target.files[0])
                        }
                    />
                    <p>
                        Select a <code>.png</code> image from your machine.
                    </p>
                    <p className="button">Select Image</p>
                    <p>{imageName}</p>
                </label>
                <button
                    type="submit"
                    className="button"
                    style={{ marginTop: "1rem", width: "50%" }}
                >
                    {isUploadLoading ? "Uploading..." : "Upload"}
                </button>
            </form>

            {imageUploaded && (
                <section className="subcontainer">
                    <button
                        onClick={() => fetchISOutput()}
                        className="button"
                        style={{ margin: "1rem 0", width: "50%" }}
                    >
                        {isISLoading ? "Loading..." : "Run IS"}
                    </button>
                    {isShowISOutput && (
                        <img
                            src={`http://127.0.0.1:8000/${ISOutputDir}`}
                            width={400}
                        />
                    )}

                    <button
                        onClick={() => fetchFTAOutput()}
                        className="button"
                        style={{ margin: "1rem 0", width: "50%" }}
                    >
                        {isFTALoading ? "Loading..." : "Run FTA"}
                    </button>
                    {isShowFTAOutput && (
                        <img
                            src={`http://127.0.0.1:8000/${FTAOutputDir}`}
                            width={400}
                        />
                    )}

                    <button
                        onClick={() => fetchTODutput()}
                        className="button"
                        style={{ margin: "1rem 0", width: "50%" }}
                    >
                        {isTODLoading ? "Loading..." : "Run TOD"}
                    </button>
                    {isShowTODutput && (
                        <img
                            src={`http://127.0.0.1:8000/${TODutputDir}`}
                            width={400}
                        />
                    )}
                </section>
            )}
        </main>
    );
}

export default App;
