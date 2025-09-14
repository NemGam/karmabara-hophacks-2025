import PartnershipCard from './PartnershipCard';

function Partnership() {
    return (
        <>
            <div className="relative h-screen flex flex-col items-center justify-center text-center text-white p-4">
                <img
                    src="/KarmaBara2.png" 
                    alt="Zen Capybara"
                    className="absolute inset-0 w-full h-full object-cover z-0 brightness-75"
                />
                <div className="absolute inset-0 bg-black opacity-30 z-10"></div>{' '}
                {/* Content */}
                <div className="relative z-20">
                    {' '}
                    <h2 className="text-5xl font-bold mb-4">Partner with Us</h2>
                    <p className="text-lg max-w-2xl">
                        Join our network of innovators and grow together. We're looking for partners
                        who share our vision and are ready to create the future. If you're
                        passionate about what you do, we want to hear from you.
                    </p>
                    <br />
                    <a
                        href="mailto:example@notRealEmail.com"
                        className="mt-8 px-6 py-3 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors">
                        Get in Touch
                    </a>
                </div>
            </div>

            {/* Current Partnerships Section */}
            <div className="px-[20%] h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-center mb-6">Our Current Partnerships</h1>
                <div className="flex justify-center">
                    <PartnershipCard
                        imageSrc="/BoldCampaignLogo.png"
                        title="Bold Campaign"
                        description="This is our partnership with a small game company. We work together to achieve common goals and create amazing products."
                    />
                </div>
            </div>
        </>
    );
}

export default Partnership;
