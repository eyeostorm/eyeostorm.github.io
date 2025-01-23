function resizeHandler() {
    console.log('window resized', global_path_gen_image.clientWidth, window.innerWidth, window.innerHeight)
    
}

window.addEventListener('resize', resizeHandler)
