import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCarousel from "../HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../HomeSectionCarousel/HomeSectionCarousel";
import { findProducts } from "../../State/Product/Action";

const HomePage = () => {
    const dispatch = useDispatch();

    const { products, loading } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(
            findProducts({
                pageNumber: 0,
                pageSize: 50, // fetch enough products for homepage
            })
        );
    }, [dispatch]);

    // helper to filter products by category name
    const filterByCategory = (name) =>
        products?.filter(
            (p) => p.category?.name?.toLowerCase() === name.toLowerCase()
        );

    return (
        <div>
            <MainCarousel />

            <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                {!loading && (
                    <>
                        <HomeSectionCarousel
                            data={filterByCategory("mens_kurta")?.slice(0, 8)}
                            sectionName="Men's Kurta"
                        />

                        <HomeSectionCarousel
                            data={filterByCategory("shirt")?.slice(0, 8)}
                            sectionName="Men's Shirt"
                        />

                        <HomeSectionCarousel
                            data={filterByCategory("saree")?.slice(0, 8)}
                            sectionName="Women's Saree"
                        />

                        <HomeSectionCarousel
                            data={filterByCategory("lehenga_choli")?.slice(0, 8)}
                            sectionName="Lehenga Choli"
                        />

                        <HomeSectionCarousel
                            data={filterByCategory("top")?.slice(0, 8)}
                            sectionName="Women's Top"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;
