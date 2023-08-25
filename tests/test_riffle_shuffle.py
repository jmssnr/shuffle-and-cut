from api.service import riffle_shuffle


def test_returns_list_with_len_of_input():
    input = [1, 2, 3]
    output = riffle_shuffle(input)
    assert len(input) == len(output)


def test_returns_shuffled_list():
    input = range(1, 1000)
    output = riffle_shuffle(input)
    assert input != output
