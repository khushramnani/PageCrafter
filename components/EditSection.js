import React from "react";
import Edit from '@/components/Edit';



const EditBar = ({selectedComponent, handleUpdateComponent, components, setComponents, backgroundImage, setBackgroundImage}) => {

    return(
        <>
        <div className="p-2 w-[15vw] bg-slate-900">
          {/* <h3>Edit Component</h3> */}
          <Edit
            selectedComponent={selectedComponent}
            handleUpdateComponent={handleUpdateComponent}
            components={components}
            setComponents={setComponents}
          />
        </div>
        </>
    )
}

export default EditBar;