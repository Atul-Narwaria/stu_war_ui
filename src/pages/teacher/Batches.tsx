import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import DataGrids from '../../components/table/DataGrids'

export default function Batches() {
  return (
    <>
    <Breadcrumb name="Batches">
    </Breadcrumb>
    <div className="my-2">
        <DataGrids name="teacherAllbatches"   />
    </div>
    </>
  )
}
