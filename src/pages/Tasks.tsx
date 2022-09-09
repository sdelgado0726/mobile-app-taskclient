import { IonButton, IonButtons, IonCheckbox, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { addCircleOutline, addCircleSharp, trashOutline, trashSharp } from 'ionicons/icons';
import { TaskProvider, TaskType } from "../hooks/TaskProvider";
import './Tasks.css';


const Task: React.FC = () => {

	const [tasks, setTasks] = useState<TaskType[]>([]);
    const [ refresh, setRefresh ] = useState(0);


    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);


    const [newTask, setNewTask] = useState({
        title: ''
    })


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewTask((preValue) => {
            return {...preValue, [event.target.name]: event.target.value}
        })
    }


    function handleSubmit() {
        modal.current?.dismiss(input.current?.value, 'confirm');
        TaskProvider.createTask(newTask)
        setNewTask({title: ''})
        setRefresh(refresh + 1)
    }


	useEffect(() => {
		TaskProvider.getAllTask()
			.then((data) => {
				setTasks(data);
			})
		return () => {};
	}, [refresh]);


    function handleDelete(id: number) {
        TaskProvider.deleteTask(id).then(() => {
          alert('Post deleted!')
          setRefresh(refresh + 1)
        }).catch(error => {
          console.log(error);
        });
    }


    function handleCheckboxChange(task: any, id: number): any {
 
        if(task.completed == true) {
            task.completed = false;
        } else {
            task.completed = true
        }
        TaskProvider.updateTask(task, id)
        setRefresh(refresh + 1)
    }


    const displayIncompletedTasks = () => {

        return tasks.map((t: any) => {
            if (t.completed !== true)
            return (
                
                <IonItemSliding key={t.taskId}>
                    <IonItem>
                        <IonLabel>{t.title}</IonLabel>
                        <IonCheckbox onClick={() => handleCheckboxChange(t, t.taskId)} slot="end" value={t.title} checked={t.completed} color='success'/>
                    </IonItem>
                    <IonItemOptions>
                        <IonItemOption color="primary">
                            <IonIcon onClick={handleDelete.bind(this, t.taskId)} slot="icon-only" ios={trashOutline} md={trashSharp} />
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>    
            )
        })
    }


    const displayCompletedTasks = () => {
        
        return tasks.map((t: any) => {
            if (t.completed === true)
            return (
                <IonItemSliding key={t.taskId}>
                    <IonItem>
                        <IonLabel>{t.title}</IonLabel>
                        <IonCheckbox onClick={() => handleCheckboxChange(t, t.taskId)} slot="end" value={t.title} checked={t.completed} color='success'/>
                    </IonItem>
                    <IonItemOptions>
                        <IonItemOption color="primary">
                            <IonIcon onClick={handleDelete.bind(this, t.taskId)} slot="icon-only" ios={trashOutline} md={trashSharp} />
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>   
            )
        })
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color='success'>
                    <IonTitle>Task List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader>
                    <IonToolbar color='secondary'>
                        <IonText className="text">Incomplete</IonText>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                        { displayIncompletedTasks() }
                </IonList>

                <IonHeader>
                    <IonToolbar color='secondary'>
                        <IonText className="text">Complete</IonText>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                        { displayCompletedTasks() }
                </IonList>

                <IonModal ref={modal} trigger="open-modal" >
                    <IonHeader>
                        <IonToolbar color='secondary'>
                        <IonButtons slot="start">
                            <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                        </IonButtons>
                        <IonTitle className="createTask">Create Task</IonTitle>
                        <IonButtons slot="end">
                            <IonButton strong={true} onClick={(e) => { e.preventDefault(); handleSubmit();}}>
                            Add Task
                            </IonButton>
                        </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonLabel className="title" position="stacked">Task Title</IonLabel>
                        <IonItem color='white'>
                            <input className="inputLength" type='text' name='title' value={newTask.title} onChange={handleChange} placeholder="enter task title"/>
                        </IonItem>
                    </IonContent>
                </IonModal>      
            </IonContent>

            <IonFooter collapse="fade">
                <IonIcon color="secondary" className="add" id="open-modal" ios={addCircleOutline} md={addCircleSharp}></IonIcon>
            </IonFooter> 
        </IonPage>  
    ) 
}


export default Task;


        