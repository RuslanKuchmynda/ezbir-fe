'use client'

import CreateFundraiserMenu from "@/app/profile/components/CreateFundraiserMenu";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Avatar} from "antd";

// User imports
import FundraiserCard from "@/components/FundraiserCard";
import SettingMenu from "@/app/profile/components/SettingMenu";
import {FundraiserData} from "@/interfaces/FundraiserData";

const Profile: React.FC = (props) =>{
    const router = useRouter();
    const [fundraisersData, setFundraisersData] = useState<FundraiserData[]>([]);


    useEffect(() => {
        const token: string | null = sessionStorage.getItem('auth_token');
        if (!token) {
            router.push('/login');
        } else {
            try {
                const storedFundraisers = sessionStorage.getItem('fundraiser');
                if (storedFundraisers) {
                    setFundraisersData(JSON.parse(storedFundraisers));
                }
            } catch (error) {
                console.error('Failed to parse fundraiser data:', error);
                setFundraisersData([]);
            }
        }
    }, [router]);

    const username = sessionStorage.getItem('username') ?? '';
    const email = sessionStorage.getItem('email') ?? '';
    const infoAboutYourself = sessionStorage.getItem('infoAboutYourself') ?? '';


    return(
        <main className='flex flex-col  items-center'>
            <section className='flex flex-grow p-4 w-[80%] mt-4'>
                <section>
                    <Avatar shape="square" size={256} icon={<img src='/img/userIcon.svg' alt="avatar"/>}/>
                </section>
                <section className='flex flex-col pl-4'>
                    <p>
                        Імʼя:
                        <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{username}
                    </p>
                    <br/>
                    <p>
                        Електронна пошта:
                        <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{email}
                    </p>
                    <br/>
                    <p>
                        Про себе:
                        <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{infoAboutYourself}
                    </p>

                </section>
                <SettingMenu/>
            </section>
            <section className='flex flex-col flex-grow items-center p-4  w-[80%]'>
                <CreateFundraiserMenu/>
                <ul className='w-full'>
                    {fundraisersData.map((item:FundraiserData) => (
                            <FundraiserCard
                                categories={item.categories}
                                description={item.description}
                                isClosed={item.isClosed}
                                jarLink={item.jarLink}
                                name={item.name}
                                posts={item.posts}
                                amount={item.amount}
                                user_id={item.user_id}
                                fundraiserId={item.fundraiserId}
                                username={username}
                                views={item.views}
                                key={item.fundraiserId}
                                isEdit={true}
                            />
                    ))}
                </ul>

            </section>
        </main>
    );
};

export default Profile;
