import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<boolean>(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const responseData = await response.json();
            if (responseData?.data) {
                toast.success(responseData?.data?.message);
                setEmail('');
                setMessage(true);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                toast.error(responseData?.error || 'Invalid User');
            }
        } catch (error) {
            console.log(error);
            toast.error('Invalid Request');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg md:w-96 w-full mx-4">
                <h1 className="text-2xl font-semibold text-center mb-4">Forgot Password</h1>
                {message && (
                    <p className="text-green-600 font-semibold text-center mb-4">
                        Password reset link sent successfully to your email.
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            name="email"
                            id="email"
                            placeholder="Enter Your Email Address"
                            className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    {isLoading ?
                        <div className="absolute inset-0 flex items-center justify-center bg-opacity-75">
                            <div className="animate-spin rounded-full border-t-2 border-b-2 border-blue-600 h-6 w-6"></div>
                        </div> : <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-[10px] hover:bg-blue-600">
                            Send
                        </button>
                    }
                </form>

            </div>
        </div>
    );
};

export default ForgotPassword;
