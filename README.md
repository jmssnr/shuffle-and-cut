# shuffl

_shuffl_ is a web-application for modelling, simulation and analysis of playing card shuffling sequences.

## Getting Started

The frontend of _shuffl_ is written in React.js and utilizes [Next.js](https://nextjs.org/). The backend is written in Python based on FastAPI.

To run the backend server, first create a new Python environment and install the necessary dependencies:

- Install and activate new Python environment
  ```
  python -m venv .venv
  ```
  ```
  .\.venv\Scripts\activate
  ```
- Install all Python dependencies
  ```
  pip install -r requirements.txt
  ```
- [Optional] Install pre-commit hooks for the backend
  ```
  pre-commit install
  ```

Then you can run the backend locally with uvicorn as follows:

```
python -m uvicorn "api.index:app" --reload
```

The backend then runs on [http://127.0.0.1:8000](http://127.0.0.1:8000)

To run the frontend with install the necessary dependencies with `npm install` then run the frontend locally in development mode with `npm run dev`. Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend of _shuffl_.
