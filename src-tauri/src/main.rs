#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod pty;

use tauri::Manager;

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();
            #[cfg(target_os = "linux")]
            main_window.with_webview(|webview| {
                use webkit2gtk::traits::WebViewExt;
                webview.inner().set_zoom_level(1.5);
            });
            Ok(())
        })
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .invoke_handler(tauri::generate_handler![
            pty::pty_init,
            pty::pty_write,
            pty::pty_resize
        ])
        .run(context)
        .expect("error while running tauri application");
}
