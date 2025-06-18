// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize}; // for working with JSON
use std::sync::Mutex; // safe concurrent access to mutable data across threads
use tauri::State; // for injecting shared state (db or contacts list)

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Contact {
    name: String,
    phone: String,
}

struct ContactList(Mutex<Vec<Contact>>);

#[tauri::command] // exposes the function to the frontend via envoke()
fn get_contacts(state: State<ContactList>) -> Vec<Contact> {
    state.0.lock().unwrap().clone()
}

#[tauri::command]
fn add_contact(name: String, phone: String, state: State<ContactList>) {
    let mut contacts = state.0.lock().unwrap();
    contacts.push(Contact { name, phone })
}

fn main() {
    // entry point
    tauri::Builder::default()
        .manage(ContactList(Mutex::new(Vec::new())))
        .invoke_handler(tauri::generate_handler![get_contacts, add_contact])
        .run(tauri::generate_context!())
        .expect("error running Tauri app!")
}
