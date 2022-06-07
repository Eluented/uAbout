import pytest
from .__init__ import app


@pytest.fixture
def api():
    return app.test_client()
