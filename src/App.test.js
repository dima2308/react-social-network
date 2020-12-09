import store from './redux/store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders learn react link', () => {
  <BrowserRouter>
    <Provider store={store}>
      render(<App />);
      const linkElement = screen.getByText(/learn react/i);
      expect(linkElement).toBeInTheDocument();
    </Provider>
  </BrowserRouter>
});
