# MLA

The [MLA](https://github.com/xyntechx/Manga-Layout-Analysis) web application.

## 🔨 Usage

Before proceeding, please ensure that you have trained a `.h5` IS model using the Jupyter Notebooks found in [`xyntechx/Manga-Layout-Analysis`](https://github.com/xyntechx/Manga-Layout-Analysis).

### API

- Clone the `teamxynlab/MLA-API` repository

```bash
git clone https://github.com/teamxynlab/MLA-API.git
```

- CD into your local copy of `teamxynlab/MLA-API`

- Create a Python virtual environment

```bash
python3 -m venv .venv
```

- Activate the virtual environment

- Install the required packages

```bash
pip install -r requirements.txt
```

- Add your own MLA IS model (named `IS.h5`) into the `/models` folder

- Run the API

```bash
python3 main.py
```

### Frontend

- Clone the `teamxynlab/MLA` repository

```bash
git clone https://github.com/teamxynlab/MLA.git
```

- CD into your local copy of `teamxynlab/MLA`

- Install the npm packages

```bash
npm i
```

- Run the web app

```bash
npm run dev
```

- Navigate to `http://localhost:5173/`

## 🤖 Technologies
- Flask
- TensorFlow
- Keras
- OpenCV
- Matplotlib
- React
- Vite
