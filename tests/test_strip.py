from api.service import strip


def test_returns_list_with_len_of_input():
    input = [1, 2, 3]
    output = strip(input)
    assert len(input) == len(output)


def test_returns_shuffled_list():
    input = list(range(1, 1000))
    output = strip(input)
    assert input != output
