from api.service import strip


def test_top_card_always_gets_buried():
    input = list(range(1, 53))
    output = strip(input)
    position_top_card = output.index(1)
    assert position_top_card > 1


def test_returns_list_with_len_of_input():
    input = [1, 2, 3]
    output = strip(input)
    assert len(input) == len(output)


def test_returns_shuffled_list():
    input = list(range(1, 1000))
    output = strip(input)
    assert input != output
