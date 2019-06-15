var expect = chai.expect;

describe('findBestMove', function () {
  it('1. The first move should be in the corner.', function () {
    expect(findBestMove([0, 0, 0, 0, 0, 0, 0, 0, 0])).to.be.oneOf([0, 2, 6, 8]);
  });
  it('2. The Second move should be in the center if the center is not occupied.', function () {
    expect(findBestMove([0, 1, 0, 0, 0, 0, 0, 0, 0])).to.equal(0);
  });
  it('3. The Second move should be in the corner if the center is occupied.', function () {
    expect(findBestMove([0, 0, 0, 0, 1, 0, 0, 0, 0])).to.be.oneOf([0, 2, 6, 8]);
  });
  it('4. Should win if can have three squares in one line - horizontal', function () {
    expect(findBestMove([0, 1, 1, 0, -1, 0, -1, 0, 0])).to.equal(0);
  });
  it('5. Should win if can have three squares in one line - vertical', function () {
    expect(findBestMove([0, 1, -1, 0, 1, 0, -1, 0, 0])).to.equal(7);
  });
  it('6. Should win if can have three squares in one line - diagonal', function () {
    expect(findBestMove([0, -1, 1, 0, 1, 0, 0, -1, 0])).to.equal(6);
  });
  it('7. Should block unless going to win', function () {
    expect(findBestMove([0, -1, -1, 0, 1, 0, 0, 1, 0])).to.equal(0);
  });
  it('8. Should fork: has two lines which each has two squares', function () {
    expect(findBestMove([1, 0, -1, 0, -1, 0, 0, 0, 1])).to.equal(6);
  });
  it('9. Should block fork unless going to win or fork', function () {
    expect(findBestMove([-1, 1, 0, 0, -1, 0, 0, 0, 1])).to.be.oneOf([2, 6]);
  });
});