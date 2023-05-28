import { cleanup, render } from '@testing-library/react';

import Header from '../Header';

describe('Component Header', () => {
  afterEach(cleanup);

  it('should render component', () => {
    const { getByText } = render(<Header />);

    expect(getByText('to')).toBeInTheDocument();
    expect(getByText('do')).toBeInTheDocument();
  });
});
