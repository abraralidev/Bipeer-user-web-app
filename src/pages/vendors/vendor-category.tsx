import ServiceList from '@/components/professional/ServiceList'
import RootLayout from '../layout'
import React from 'react'
import ProfessionalLayout from '../professional/layout'
import VendorList from '@/components/vendor/VendorList'

const VendorCategory = () => {
    return (
        <div>
            <VendorList vendors={null} />
        </div>
    )
}


VendorCategory.getLayout = (page: React.ReactElement) => (
    <ProfessionalLayout>
        {page}
    </ProfessionalLayout>
)

export default VendorCategory