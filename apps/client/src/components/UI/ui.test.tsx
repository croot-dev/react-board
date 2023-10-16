import { fireEvent, render, screen } from '@testing-library/react';
import {
  Button, Col, Input, Link, Row, Select, Textarea,
} from '.';

describe('Button Component', () => {
  it('renders a button with default props', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText('Click me');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toHaveAttribute('disabled');
  });

  it('renders a button with custom props', () => {
    const { getByText } = render(
      <Button type="submit" size="large" disabled onClick={() => console.log('Clicked')}>
        Submit
      </Button>,
    );

    const button = getByText('Submit');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('disabled');
  });

  it('calls the onClick function when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
    const button = getByText('Click me');

    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });
});

describe('Col Component', () => {
  it('renders a Col with default props', () => {
    const { container } = render(<Col>Content</Col>);
    const col = container.firstChild;

    expect(col).toBeInTheDocument();
    expect(col).toHaveStyle({ flex: '1 1 auto' });
  });

  it('renders a Col with a custom size', () => {
    const { container } = render(<Col size={6}>Content</Col>);
    const col = container.firstChild;

    expect(col).toBeInTheDocument();
    expect(col).toHaveStyle({ flexBasis: '50%' }); // 6/12 * 100%
  });

  it('passes other HTML attributes to the Col', () => {
    const { container } = render(<Col size={6} data-test="col">Content</Col>);
    const col = container.firstChild;

    expect(col).toHaveAttribute('data-test', 'col');
  });
});

describe('Input Component', () => {
  it('renders an input with default props', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
    const input = getByPlaceholderText('Enter text');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', '');
    expect(input).not.toHaveAttribute('required');
  });

  it('renders an input with custom props', () => {
    const { getByPlaceholderText } = render(
      <Input type="password" name="password" required placeholder="Enter password" />,
    );
    const input = getByPlaceholderText('Enter password');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('name', 'password');
    expect(input).toHaveAttribute('required');
  });

  it('triggers the onChange event', () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" onChange={onChangeMock} />);
    const input = getByPlaceholderText('Enter text');

    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(onChangeMock).toHaveBeenCalled();
    expect(onChangeMock).toHaveBeenCalledWith('New Value', expect.any(Object));
  });
});

describe('Link Component', () => {
  it('renders a link with default props', () => {
    const { getByText } = render(<Link href="/default">Default Link</Link>);
    const link = getByText('Default Link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/default');
    expect(link).toHaveAttribute('data-type', 'anchor');
    expect(link).toHaveAttribute('data-size', 'normal');
  });

  it('renders a link with custom props', () => {
    const { getByText } = render(
      <Link href="/custom" type="button" size="large">
        Custom Link
      </Link>,
    );
    const link = getByText('Custom Link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/custom');
    expect(link).toHaveAttribute('data-type', 'button');
    expect(link).toHaveAttribute('data-size', 'large');
  });
});

describe('Row Component', () => {
  it('renders a row with default props', () => {
    const { container } = render(<Row>Children</Row>);
    const row = container.firstChild;

    expect(row).toBeInTheDocument();
    expect(row).toHaveStyle('display: flex');
    expect(row).toHaveStyle('flex-direction: row');
    expect(row).toHaveStyle('gap: 0px');
  });

  it('renders a row with custom gap', () => {
    const { container } = render(<Row gap={16}>Children</Row>);
    const row = container.firstChild;

    expect(row).toBeInTheDocument();
    expect(row).toHaveStyle('display: flex');
    expect(row).toHaveStyle('flex-direction: row');
    expect(row).toHaveStyle('gap: 16px');
  });

  it('passes other HTML attributes to the Row', () => {
    const { container } = render(<Row gap={8} data-test="row">Children</Row>);
    const row = container.firstChild;

    expect(row).toHaveAttribute('data-test', 'row');
  });
});

describe('Select Component', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  it('renders a select with default props', () => {
    const { getByText } = render(<Select options={options} />);
    const select = getByText('Option 1').parentElement;

    expect(select).toBeInTheDocument();
    expect(select.tagName).toBe('SELECT');
    expect(select).toHaveAttribute('name', '');
    expect(select).toHaveAttribute('tabindex', '-1');
  });

  it('renders a select with custom props', () => {
    const { getByText } = render(
      <Select name="mySelect" label="Select an option" defaultValue="option2" options={options} />,
    );
    const select = getByText('Option 2').parentElement;

    expect(select).toBeInTheDocument();
    expect(select.tagName).toBe('SELECT');
    expect(select).toHaveAttribute('name', 'mySelect');
    expect(select).toHaveAttribute('tabindex', '-1');
  });

  it('triggers the onChange event', () => {
    const onChangeMock = jest.fn();
    const { getByText } = render(
      <Select options={options} onChange={onChangeMock} />,
    );
    const select = getByText('Option 1').parentElement;

    fireEvent.change(select, { target: { value: 'option3' } });

    expect(onChangeMock).toHaveBeenCalled();
    expect(onChangeMock).toHaveBeenCalledWith('option3', expect.any(Object));
  });
});

describe('Textarea Component', () => {
  it('renders a textarea with default props', () => {
    const { container, getByLabelText } = render(<Textarea label="Textarea" />);
    const textarea = container.querySelector('Textarea');

    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('name', '');
    expect(textarea).toHaveAttribute('cols', '20');
    expect(textarea).toHaveAttribute('rows', '4');
    expect(textarea).not.toHaveAttribute('required');
  });

  it('renders a textarea with custom props', () => {
    const { container } = render(
      <Textarea label="Custom Textarea" name="customTextarea" cols={40} rows={6} required />,
    );
    const textarea = container.querySelector('Textarea');

    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('name', 'customTextarea');
    expect(textarea).toHaveAttribute('cols', '40');
    expect(textarea).toHaveAttribute('rows', '6');
    expect(textarea).toHaveAttribute('required');
  });

  it('triggers the onChange event', () => {
    const onChangeMock = jest.fn();
    const { container } = render(<Textarea label="Textarea" onChange={onChangeMock} />);
    const textarea = container.querySelector('Textarea');

    fireEvent.change(textarea, { target: { value: 'New Text' } });

    expect(onChangeMock).toHaveBeenCalled();
    expect(onChangeMock).toHaveBeenCalledWith('New Text', expect.any(Object));
  });
});
