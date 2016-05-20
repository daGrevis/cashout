#!/usr/bin/env python
from app import app


if __name__ == "__main__":
    # This is intended for development.
    app.run(debug=True, port=8000)
