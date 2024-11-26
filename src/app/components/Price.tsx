const Price = () => {
    return (
        <div className="px-10 py-10 max-w-[500px] w-full">
            <div className="flex items-center mb-6">
                <div className="mr-4">
                    <img src="/blink-logo.svg" alt="Blink Logo" className="w-8 h-8" />
                </div>
                <div className="text-xl font-bold text-white">blink</div>
                <span className="ml-4 px-2 py-1 bg-yellow-500 text-gray-900 rounded-full text-xs font-medium">
                    TEST MODE
                </span>
            </div>
            <div className="text-white">
                <p className="text-[16px] text-[#999999] font-medium mb-4">Subscribe to Professional</p>
                <div className="font-bold mb-4 flex items-center">
                    <span className="text-4xl">€10.00</span>
                    <span className="text-[12px] pl-2 text-[#999999]"> per month</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-[15px]">Professional</p>
                        <span className="text-[12px] text-[#999999]">Billed monthly</span>
                    </div>
                    <div className="text-right">
                        <p className="text-[15px]">€10.00</p>
                    </div>
                </div>
                <hr className="mb-4 border-gray-800" />
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-[15px]">Subtotal</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[12px]">€10.00</p>
                    </div>
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        className="bg-gray-800 w-[45%] text-white px-2 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 focus:outline-none"
                        placeholder="Add promotion code"
                    />
                </div>
                <hr className="mb-4 border-gray-800" />
                <div className="mb-4 flex justify-between items-center">
                    <p className="text-[15px]">Total due today</p>
                    <p className="text-4xl font-bold text-[15px]">€10.00</p>
                </div>
            </div>
        </div>
    );
};

export default Price

