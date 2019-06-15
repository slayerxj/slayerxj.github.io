var expect = chai.expect;

describe('findBestMove', function () {
  it('The first move should be in the corner.', function () {
    expect(findBestMove([0, 0, 0, 0, 0, 0, 0, 0, 0])).to.be.oneOf([0, 2, 6, 8]);
  });
  it('The Second move should be in the center if the center is not occupied.', function () {
    expect(findBestMove([0, 1, 0, 0, 0, 0, 0, 0, 0])).to.equal(4);
  });
  it('The Second move should be in the corner if the center is occupied.', function () {
    expect(findBestMove([0, 0, 0, 0, 1, 0, 0, 0, 0])).to.be.oneOf([0, 2, 6, 8]);
  });
  it('Should win if can have three squares in one line - horizontal', function () {
    expect(findBestMove([0, 1, 1, 0, -1, 0, -1, 0, 0])).to.equal(0);
  });
  it('Should win if can have three squares in one line - vertical', function () {
    expect(findBestMove([0, 1, -1, 0, 1, 0, -1, 0, 0])).to.equal(7);
  });
  it('Should win if can have three squares in one line - diagonal', function () {
    expect(findBestMove([0, -1, 1, 0, 1, 0, 0, -1, 0])).to.equal(6);
  });
  it('Should block unless going to win', function () {
    expect(findBestMove([0, -1, -1, 0, 1, 0, 0, 1, 0])).to.equal(0);
  });
  it('Should fork: has two lines which each has two squares', function () {
    expect(findBestMove([1, 0, -1, 0, -1, 0, 0, 0, 1])).to.equal(6);
  });
  it('Should block fork unless going to win or fork', function () {
    expect(findBestMove([-1, 1, 0, 0, -1, 0, 0, 0, 1])).to.equal(6);
  });
});