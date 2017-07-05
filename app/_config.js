const config = {}

config.development = {
  url: 'https://' + (window.location.hostname) + ':8443/'
}

config.production = {
  url: 'https://' + (window.location.hostname) + '/'
}

export default config
