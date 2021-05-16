import { formatCategories } from '../../src/utils/convertText';

describe('formatCategories', () => {
  let names;
  let result;

  beforeEach(() => {
    names = ['Arashi'];
    result = '';
  });

  test('creates the correct category label for the indicated story', () => {
    result = formatCategories(names);
    expect(result).toEqual(
      expect.stringMatching(/.*\[\[Category:.* - Story\]\].*/),
    );
    result = formatCategories(names);
    expect(result).toEqual(
      expect.stringMatching(/.*\[\[Category:.* - Story !!\]\].*/),
    );
  });

  test('creates a category label for each character', () => {
    names = ['Arashi', 'Mika', 'Shu'];
    result = formatCategories(names);
    const regex =
      /.*\[\[Category:Arashi Narukami - Story\]\]\n\[\[Category:Mika Kagehira - Story\]\]\n\[\[Category:Shu Itsuki - Story\]\]$/;
    expect(result).toEqual(expect.stringMatching(regex));
  });
});
