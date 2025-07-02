import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "shared-components/Navbar";
import { getArtworkById } from "services/artwork";
import LoadingSpinner from "shared-components/LoadingSpinner";
import ArtworkInfoSection from "./ArtworkInfoSection";
import Footer from "shared-components/Footer";

const ArtworkShowPage = () => {
	const [artwork, setArtwork] = useState(null);
	const [loading, setLoading] = useState(true);
	const { artwork_id } = useParams();

	useEffect(() => {
		(async () => {
			setLoading(true);
			const response = await getArtworkById(artwork_id);
			setArtwork(await response.json());
			setLoading(false);
		})();
	}, [artwork_id]);

	return (
		<>
			<Navbar />
			<div className="w-screen flex justify-center bg-bkgrd min-h-screen font-lato">
				<div className="w-full max-w-6xl py-24">
					{loading ? (
						<LoadingSpinner />
					) : (
						<ArtworkInfoSection artwork={artwork} />
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ArtworkShowPage;
