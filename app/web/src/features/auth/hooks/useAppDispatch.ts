import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store'; // Adjust the path

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
