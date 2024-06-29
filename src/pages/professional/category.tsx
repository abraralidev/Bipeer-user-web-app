import ServiceList from '@/components/professional/ServiceList'
import RootLayout from '../layout'
import React from 'react'
import ProfessionalLayout from './layout'

const ServiceCategory = () => {
    return (
        <div>
            <ServiceList />
        </div>
    )
}


ServiceCategory.getLayout = (page: React.ReactElement) => (
    <ProfessionalLayout>
        {page}
    </ProfessionalLayout>
)

export default ServiceCategory